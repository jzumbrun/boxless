const QueryModel = require('@app/routes/query/models/query_model')

module.exports = (server) => {

    /**
     * query
     */
    server.post('/query', (req, res) => {

        var response = {queries: []},
            queries_count = 0,
            user_params = req.user,
            allowed_queries = require('../allowed_queries')
            private_queries = require('../private_queries')

            // private_queries should NEVER be ovverridden
            allowed_queries = {...allowed_queries, ...private_queries}

        // Send the result
        function result(connection, query, error, rows){
            var result = {}
            queries_count++

            if(error) result = {name: query.name, results: null, error: error }
            else result = {name: query.name, results: rows }

            if(query.id) result.id = query.id

            response.queries.push(result)

            if(queries_count == req.body.queries.length){
                connection.release()
                res.send(response)
            }
        }

        try {

            QueryModel.getConnection((error, connection) => {

                req.body.queries = req.body.queries || []
                req.body.queries.forEach((request_query) => {

                    let query = allowed_queries.find(q => q.name == request_query.name)
                    // Do we have sql?
                    if(!query){
                        return result(connection, request_query, {'errno': 1000, 'code': 'ERROR_QUERY_NOT_FOUND'})
                    }

                    if(query.controller){
                        let [route, controller_name, method] = query.name.spit('.')
                        controller = require(`@/routes/${route}/${controller_name}_controller`)
                        result(connection, request_query, error, controller[method](request_query.parms, req, res))
                    }

                    // Hook to allow for params
                    connection.config.queryFormat = (request_query, req_params) => {
                        return QueryModel.format(request_query, req_params, user_params)
                    }

                    connection.query(query.expression, request_query.params, (error, rows) => {
                        result(connection, request_query, error, rows)
                    })
                })
            })
        } catch(error) {
            res.send({error: error})
        }
    })
}