const _ = require('lodash')
const QueryModel = require('@app/routes/query/models/query_model')
const server = require('@app/lib/server')
const definitions = require('@app/routes/query/defined_queries.json5')
const { route } = require('@app/supersequel')

/**
 * query
 */
server.post('/query', async (req, res) => {
    await route(req, res, {
        definitions: definitions,
        query: (query) => {
            return QueryModel.query(query)
        },
        release: () => {
            QueryModel.release()
        },
        helpers: [
            {functions: _, prefix: '_'}
        ]
    })
})
