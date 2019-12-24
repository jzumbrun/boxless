const Ajv = require('ajv')
const hbs = require('handlebars')
const intersection = require('lodash/intersection')


/**
 * Validate Request
 * @param {object} request 
 * @param {Ajv} inboundAjv 
 */
function validateRequest(request = {}, inboundAjv) {

    return inboundAjv.validate({
        'type': 'object',
        'properties': {
            'id': {
                'type': 'string',
                'default': ''
            },
            'name': {
                'type': 'string',
                'default': 'ERROR_MISSING_NAME'
            },
            'properties': {
                'type': 'object',
                'default': {}
            },
            'sync': {
                'type': 'boolean',
                'default': false
            }
        },
        'additionalProperties': false,
    }, request)
    
}


/**
 * Validate Query Definition
 * @param {object} definition 
 * @param {Ajv} inboundAjv 
 */
function validateQueryDefinition(definition = {}, inboundAjv) {

    return inboundAjv.validate({
        'type': 'object',
        'properties': {
            'name': {
                'type': 'string',
                'default': 'ERROR_MISSING_NAME'
            },
            'expression': {
                'type': 'string',
                'default': ''
            },
            'properties': {
                'type': 'object',
                'default': {}
            },
            'inboundSchema': {
                'type': 'object',
                'default': {}
            },
            'outboundSchema': {
                'type': 'object',
                'default': {}
            },
            'access': {
                'type': 'array',
                'default': []
            }
        },
        'additionalProperties': false,
    }, definition)
}

/**
 * Outbound
 * @param {object} response 
 * @param {object} request 
 * @param {array} rows 
 * @param {object} definition 
 * @param {object} history 
 */
function outbound(response, request, rows, definition, history) {
    const outboundAjv = new Ajv({ useDefaults: true, removeAdditional: 'all' })

    // Do we have proper outbound query schema
    if(!outboundAjv.validate(definition.outboundSchema, rows)){
        response.queries.push({...getRequestName(request), error: {errno: 1005, code: 'ERROR_QUERY_OUTBOUND_VALIDATION', details: outboundAjv.errors}})
    }
    else {
        if(request.id) history[request.id] = rows
        // Add succesfull query responses by id
        response.queries.push({...getRequestName(request), results: rows })
    }
}


/**
 * Query
 * @param {object} request
 * @param {object} definition
 * @param {object} config
 * @param {object} user
 * @param {array} history
 * @return Promise
 */
function query(request, definition, config, user = {}, history = {}) {
    const expression = hbs.compile(definition.expression)({...request.properties || {}, '$user': user, '$history': history})
    return config.query(expression)
}


/**
 * Register Handlebar Helpers
 * @param {array} helpers
 */
function registerHelpers(helpers = []) {
    for(const helper of helpers) {
        // Set defaults
        helper.functions = helper.functions || []
        helper.prefix = helper.prefix || ''

        // Register a helper for every function
        for(const fn in helper.functions) {
            if(typeof helper.functions[fn] == 'function') {
                hbs.registerHelper(`${helper.prefix}${fn}`, function(...args) {
                    return helper.functions[fn](...args)
                })
            }
        }
    }
}


/**
 * Get Request Name
 * @param {object} request 
 */
function getRequestName(request) {
    if(request.id)
        return {id: request.id, name: request.name}
    return {name: request.name}
}


/**
 * Query Error
 * @param {object} error 
 * @param {object} request 
 * @param {object} response 
 * @param {object} config
 */
function queryError(error, request, response, config) {
    // Do we have good sql statements?
    let err = {...getRequestName(request), error: {errno: 1006, code: 'ERROR_IMPROPER_QUERY_STATEMENT'}}
    if(config.env == 'production')
        response.queries.push(err)
    else {
        err.details = error.message
        response.queries.push(err)
    }
}


/**
 * Query route
 * @param {object} req 
 * @param {object} res 
 * @param {object} config
 */
module.exports.route = async (req, res, config={}) => {
    
    const response = {queries: []}
    const inboundAjv = new Ajv({ useDefaults: true })
    const async = []
    const history = {}

    config.env = process.env.NODE_ENV || 'production'
        
    try {
        // Register Handlebar helpers
        registerHelpers(config.helpers)

        req.body.queries = req.body.queries || []
        for(const request of req.body.queries) {


            // Do we have proper request schema?
            if(!validateRequest(request, inboundAjv)){
                response.queries.push({...getRequestName(request), error: {errno: 1000, code: 'ERROR_REQUEST_VALIDATION', details: inboundAjv.errors}})
                continue
            }

            // Do we have proper definition query schema?
            let definition = config.definitions.find(q => q.name == request.name)
            if(!validateQueryDefinition(definition, inboundAjv)){
                response.queries.push({...getRequestName(request), error: {errno: 1001, code: 'ERROR_QUERY_DEFINITION_VALIDATION', details: inboundAjv.errors}})
                continue
            }

            // Do we have sql?
            if(!definition){
                response.queries.push({...getRequestName(request), error: {errno: 1002, code: 'ERROR_QUERY_NOT_FOUND'} })
                continue
            }

            // Do we have access rights?
            if(!intersection(definition.access, req.user.access).length){
                response.queries.push({...getRequestName(request), error: {errno: 1003, code: 'ERROR_QUERY_NO_ACCESS'} })
                continue
            }
            
            // Do we have proper inbound query schema?
            if(!inboundAjv.validate(definition.inboundSchema, request.properties))
                response.queries.push({...getRequestName(request), error: {errno: 1004, code: 'ERROR_QUERY_INBOUND_VALIDATION', details: inboundAjv.errors}})
            else {
                let queryPromise = query(request, definition, config, req.user, history)
                .then((rows) => {
                    outbound(response, request, rows, definition, history)
                })
                .catch(error => queryError(error, request, response, config))
                
                if(request.sync) await queryPromise
                else async.push(queryPromise)
            }
            
        }

        // Process all of the async queries here
        // The catch was defined above in the creation of the promise
        if(async.length) await Promise.all((async)).catch((e) => {})

        res.send(response)
    } catch(error) {
        // Do we have any uknown issues?
        let err = {error: {errno: 1007, code: 'ERROR_UNKNOWN'}}
        if(config.env == 'production')
            response.queries.push(err)
        else {
            err.details = error.message
            response.queries.push(err)
        }            
    } finally {
        config.release(response)
    }
}
