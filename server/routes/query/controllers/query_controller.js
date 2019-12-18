const Ajv = require('ajv')
const intersection = require('lodash/intersection')
const config = require('@app/config')
const QueryModel = require('@app/routes/query/models/query_model')
const server = require('@app/lib/server')
const defined_queries = require('@app/routes/query/defined_queries.json5')


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
        'required': ['name']
    }, request)
    
}


/**
 * Validate Query
 * @param {object} query 
 * @param {Ajv} inboundAjv 
 */
function validateQuery(query = {}, inboundAjv) {

    return inboundAjv.validate({
        'type': 'object',
        'properties': {
            'name': {
                'type': 'string',
                'default': 'ERROR_MISSING_NAME'
            },
            'expression': {
                'type': 'string',
                'default': 'ERROR_MISSING_EXPRESSION'
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
        'required': ['name', 'expression']
    }, query)
}


/**
 * query
 */
server.post('/query', async (req, res) => {

    var response = {queries: []},
        inboundAjv = new Ajv({ useDefaults: true }),
        outboundAjv = new Ajv({ useDefaults: true, removeAdditional: 'all' })

    try {

        req.body.queries = req.body.queries || []
        for(const request of req.body.queries) {
            // Do we have proper request schema?
            if(!validateRequest(request, inboundAjv)){
                response.queries.push({name: request.name, error: {'errno': 1000, 'code': 'ERROR_REQUEST_VALIDATION', details: inboundAjv.errors}})
                continue
            }

            // Do we have proper definition query schema?
            let query = defined_queries.find(q => q.name == request.name)
            if(!validateQuery(query, inboundAjv)){
                response.queries.push({name: request.name, error: {'errno': 1001, 'code': 'ERROR_QUERY_DEFINITION_VALIDATION', details: inboundAjv.errors}})
                continue
            }

            // Do we have sql?
            if(!query){
                response.queries.push({name: request.name, error: {'errno': 1002, 'code': 'ERROR_QUERY_NOT_FOUND'} })
                continue
            }

            // Do we have access rights?
            if(!intersection(query.access, req.user.access).length){
                response.queries.push({name: request.name, error: {'errno': 1003, 'code': 'ERROR_QUERY_NO_ACCESS'} })
                continue
            }
            
            try {
                // Do we have proper inbound query schema?
                if(!inboundAjv.validate(query.inboundSchema, request.properties))
                    response.queries.push({name: request.name, error: {'errno': 1004, 'code': 'ERROR_QUERY_INBOUND_VALIDATION', details: inboundAjv.errors}})
                else {
                    // Do we have proper outbound query schema
                    let rows = await QueryModel.query(query.expression, request.properties, req.user)
                    if(!outboundAjv.validate(query.outboundSchema, rows)){
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
        QueryModel.release()
    }
})
