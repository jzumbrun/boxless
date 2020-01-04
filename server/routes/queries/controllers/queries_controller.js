const _ = require('lodash');

const QueriesModel = require('@app/routes/queries/models/queries_model');
const server = require('@app/lib/server');
const definitions = require('@app/routes/queries/models/defined_queries.json5');
const supersequel = require('@elseblock/supersequel')({
  helpers: [{ functions: _, prefix: '_' }]
});

/**
 * query
 */
server.post('/query', async (req, res) => {
  await supersequel.route(req, res, {
    definitions: definitions,
    query: query => {
      return QueriesModel.query(query);
    },
    release: () => {
      QueriesModel.release();
    }
  });
});
