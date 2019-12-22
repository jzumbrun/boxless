const _ = require('lodash')
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
 * @param {object} query 
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
 */
function outbound(response, request, rows, definition) {
    const outboundAjv = new Ajv({ useDefaults: true, removeAdditional: 'all' })

    // Do we have proper outbound query schema
    if(!outboundAjv.validate(definition.outboundSchema, rows)){
        response.queries.push({...getRequestName(request), error: {'errno': 1005, 'code': 'ERROR_QUERY_OUTBOUND_VALIDATION', details: outboundAjv.errors}})
    }
    else
        response.queries.push({...getRequestName(request), results: rows })
}


/**
 * Query
 * @param {string} query 
 * @param {object} properties 
 * @param {User} user 
 * @return Promise
 */
function query(request, definition, config, user = {}) {
    const expression = hbs.compile(definition.expression)({...request.properties || {}, user})
    return config.query(expression)
}


/**
 * Register Handlebar Helpers
 */
function registerHelpers() {
    // Register a helper for every lodash function
    for(const fn in _) {
        hbs.registerHelper(`_${fn}`, function(...args) {
            return _[fn](...args)
        })
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
 * Query route
 */
module.exports.route = async (req, res, config={}) => {
    
    const response = {queries: []}
    const inboundAjv = new Ajv({ useDefaults: true })
    const async = []

    config.env = process.env.NODE_ENV || 'development'
        
    try {
        // Register Handlebar helpers
        registerHelpers()

        req.body.queries = req.body.queries || []
        for(const request of req.body.queries) {


            // Do we have proper request schema?
            if(!validateRequest(request, inboundAjv)){
                response.queries.push({...getRequestName(request), error: {'errno': 1000, 'code': 'ERROR_REQUEST_VALIDATION', details: inboundAjv.errors}})
                continue
            }

            // Do we have proper definition query schema?
            let definition = config.definitions.find(q => q.name == request.name)
            if(!validateQueryDefinition(definition, inboundAjv)){
                response.queries.push({...getRequestName(request), error: {'errno': 1001, 'code': 'ERROR_QUERY_DEFINITION_VALIDATION', details: inboundAjv.errors}})
                continue
            }

            // Do we have sql?
            if(!definition){
                response.queries.push({...getRequestName(request), error: {'errno': 1002, 'code': 'ERROR_QUERY_NOT_FOUND'} })
                continue
            }

            // Do we have access rights?
            if(!intersection(definition.access, req.user.access).length){
                response.queries.push({...getRequestName(request), error: {'errno': 1003, 'code': 'ERROR_QUERY_NO_ACCESS'} })
                continue
            }
            
            try {
                // Do we have proper inbound query schema?
                if(!inboundAjv.validate(definition.inboundSchema, request.properties))
                    response.queries.push({...getRequestName(request), error: {'errno': 1004, 'code': 'ERROR_QUERY_INBOUND_VALIDATION', details: inboundAjv.errors}})
                else {
                    let queryPromise = query(request, definition, config, req.user)
                    .then((rows) => {
                        outbound(response, request, rows, definition)
                    })
                    if(request.sync) await queryPromise
                    else async.push(queryPromise)
                }
                    
            } catch(error) {
                // Do we have good sql statements?
                let err = {...getRequestName(request), error: {'errno': 1006, 'code': 'ERROR_IMPROPER_QUERY_STATEMENT'}}
                if(config.env == 'production')
                    response.queries.push(err)
                else {
                    err.details = error.message
                    response.queries.push(err)
                }
                    
            }
            
        }

        if(async.length) await Promise.all((async))

        res.send(response)
    } catch(error) {
        // Do we have any uknown issues?
        let err = {error: {'errno': 1007, 'code': 'ERROR_UNKNOWN'}}
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
