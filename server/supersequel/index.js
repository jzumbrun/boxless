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
            'name': {
                'type': 'string',
                'default': 'ERROR_MISSING_NAME'
            },
            'properties': {
                'type': 'object',
                'default': {}
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
function validateQueryDefinition(queryDefinition = {}, inboundAjv) {

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
    }, queryDefinition)
}

/**
 * Query
 * @param {string} query 
 * @param {object} properties 
 * @param {User} user 
 * @return Promise
 */
function query(query, querySync, properties = {}, user = {}) {
    query = hbs.compile(query)({...properties, user})
    return querySync(query)
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
 * Query route
 */
module.exports.route = async (req, res, config={}) => {
    
    var response = {queries: []},
        inboundAjv = new Ajv({ useDefaults: true }),
        outboundAjv = new Ajv({ useDefaults: true, removeAdditional: 'all' })
    
    config.env = process.env.NODE_ENV || 'development'
        
    try {
        // Register Handlebar helpers
        registerHelpers()

        req.body.queries = req.body.queries || []
        for(const request of req.body.queries) {
            // Do we have proper request schema?
            if(!validateRequest(request, inboundAjv)){
                response.queries.push({name: request.name, error: {'errno': 1000, 'code': 'ERROR_REQUEST_VALIDATION', details: inboundAjv.errors}})
                continue
            }

            // Do we have proper definition query schema?
            let queryDefinition = config.queryDefinitions.find(q => q.name == request.name)
            if(!validateQueryDefinition(queryDefinition, inboundAjv)){
                response.queries.push({name: request.name, error: {'errno': 1001, 'code': 'ERROR_QUERY_DEFINITION_VALIDATION', details: inboundAjv.errors}})
                continue
            }

            // Do we have sql?
            if(!queryDefinition){
                response.queries.push({name: request.name, error: {'errno': 1002, 'code': 'ERROR_QUERY_NOT_FOUND'} })
                continue
            }

            // Do we have access rights?
            if(!intersection(queryDefinition.access, req.user.access).length){
                response.queries.push({name: request.name, error: {'errno': 1003, 'code': 'ERROR_QUERY_NO_ACCESS'} })
                continue
            }
            
            try {
                // Do we have proper inbound query schema?
                if(!inboundAjv.validate(queryDefinition.inboundSchema, request.properties))
                    response.queries.push({name: request.name, error: {'errno': 1004, 'code': 'ERROR_QUERY_INBOUND_VALIDATION', details: inboundAjv.errors}})
                else {
                    let rows = await query(queryDefinition.expression, config.querySync, request.properties, req.user)
                    // Do we have proper outbound query schema
                    if(!outboundAjv.validate(queryDefinition.outboundSchema, rows)){
                        response.queries.push({name: request.name, error: {'errno': 1005, 'code': 'ERROR_QUERY_OUTBOUND_VALIDATION', details: outboundAjv.errors}})
                    }
                    else 
                        response.queries.push({name: request.name, results: rows })
                }
                
            } catch(error) {
                // Do we have good sql statements?
                let err = { name: request.name, error: {'errno': 1006, 'code': 'ERROR_IMPROPER_QUERY_STATEMENT'}}
                if(config.env == 'production')
                    response.queries.push(err)
                else {
                    err.details = error.message
                    response.queries.push(err)
                }
                    
            }
            
        }
        
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
        config.finally(response)
    }
}
