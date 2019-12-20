const config = require('@app/config')
const QueryModel = require('@app/routes/query/models/query_model')
const server = require('@app/lib/server')
const queryDefinitions = require('@app/routes/query/defined_queries.json5')
const { route } = require('@app/supersequel')

/**
 * query
 */
server.post('/query', async (req, res) => {
    await route(req, res, {
        queryDefinitions: queryDefinitions,
        querySync: (query) => {
            return QueryModel.query(query)
        },
        finally: () => {
            QueryModel.release()
        }
    })
})
