const intersection = require('lodash/intersection')
    server = require('@app/lib/server'),
    QueryModel = require('@app/routes/query/models/query_model')


/**
 * query
 */
server.post('/query', async (req, res) => {

    var response = {queries: []}
        allowed_queries = require('../allowed_queries')

    try {

        req.body.queries = req.body.queries || []
        for(const request of req.body.queries) {

            let query = allowed_queries.find(q => q.name == request.name)
            // Do we have sql?
            if(!query || !intersection(query.access, req.user.access).length){
                response.queries.push({name: query.name, results: null, error: {'errno': 1000, 'code': 'ERROR_QUERY_NOT_FOUND'} })
            }

            try {
                let rows = await QueryModel.query(query.expression, request.params, req.user)
                response.queries.push({name: query.name, results: rows })
            } catch(error) {
                response.queries.push({name: query.name, results: null, error: error })
            }
            
        }
        
        res.send(response)
    } catch(error) {
        res.send({error: error})
    } finally {
        QueryModel.release()
    }
})
