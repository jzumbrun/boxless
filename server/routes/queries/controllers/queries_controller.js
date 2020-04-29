const _ = require('lodash')

const QueriesModel = require('../models/queries_model')
const server = require('../../../lib/server')
const definitions = require('../models/defined_queries.json5')
const supersequel = require('@elseblock/supersequel')({
  helpers: [{ functions: _, prefix: '_' }],
  definitions: definitions,
  query: query => QueriesModel.query(query),
  release: () => QueriesModel.release()
})

/**
 * query
 */
server.post('/query', supersequel.middleware())
