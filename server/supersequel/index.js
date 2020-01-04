const Ajv = require('ajv');
const intersection = require('lodash/intersection');
const hbs = require('./hbs');

class Superqequel {
  constructor(config = {}) {
    this.hbs = hbs();
    this.hbs.registerHelpers(config.helpers);

    config.definitions = config.definitions || [];
    config.env = process.env.NODE_ENV || 'production';
    config.query = config.query || null;
    config.release = config.release || null;
    this.config = config;
  }

  /**
   * Validate Request
   * @param {object} request
   * @param {Ajv} inboundAjv
   */
  validateRequest(request = {}, inboundAjv) {
    return inboundAjv.validate(
      {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            default: ''
          },
          name: {
            type: 'string',
            default: 'ERROR_MISSING_NAME'
          },
          properties: {
            type: 'object',
            default: {}
          },
          sync: {
            type: 'boolean',
            default: false
          }
        },
        additionalProperties: false
      },
      request
    );
  }

  /**
   * Validate Query Definition
   * @param {object} definition
   * @param {Ajv} inboundAjv
   */
  validateQueryDefinition(definition = {}, inboundAjv) {
    return inboundAjv.validate(
      {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            default: 'ERROR_MISSING_NAME'
          },
          expression: {
            type: 'string',
            default: ''
          },
          properties: {
            type: 'object',
            default: {}
          },
          inboundSchema: {
            type: 'object',
            default: {}
          },
          outboundSchema: {
            type: 'object',
            default: {}
          },
          access: {
            type: 'array',
            default: []
          }
        },
        additionalProperties: false
      },
      definition
    );
  }

  /**
   * Outbound
   * @param {object} response
   * @param {object} request
   * @param {array} rows
   * @param {object} definition
   * @param {object} history
   */
  outbound(response, request, rows, definition, history) {
    const outboundAjv = new Ajv({ useDefaults: true, removeAdditional: 'all' });

    // Do we have proper outbound query schema
    if (!outboundAjv.validate(definition.outboundSchema, rows)) {
      response.queries.push({
        ...this.getQueryName(request),
        error: {
          errno: 1005,
          code: 'ERROR_QUERY_OUTBOUND_VALIDATION',
          details: outboundAjv.errors
        }
      });
    } else {
      if (request.id) history[request.id] = rows;
      // Add succesfull query responses by id
      response.queries.push({ ...this.getQueryName(request), results: rows });
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
  query(request, definition, config, user = {}, history = {}) {
    const expression = this.hbs.compile(definition.expression, {
      ...(request.properties || {}),
      $user: user,
      $history: history
    });
    return config.query(expression);
  }

  /**
   * Get Request Name
   * @param {object} request
   */
  getQueryName(request) {
    if (request.id) return { id: request.id, name: request.name };
    return { name: request.name };
  }

  /**
   * Query Error
   * @param {object} error
   * @param {object} request
   * @param {object} response
   * @param {object} config
   */
  queryError(error, request, response, config) {
    // Do we have good sql statements?
    let err = {
      ...this.getQueryName(request),
      error: { errno: 1006, code: 'ERROR_IMPROPER_QUERY_STATEMENT' }
    };
    if (config.env == 'production') response.queries.push(err);
    else {
      err.details = error.message;
      response.queries.push(err);
    }
  }

  /**
   * Query route
   * @param {object} req
   * @param {object} res
   * @param {object} config
   */
  async route(req, res, config = {}) {
    const response = await this.execute({
      queries: req.body.queries || [],
      user: req.user,
      ...config
    });
    res.send(response);
  }

  /**
   * Execute queries
   * @param {object} config
   * @return {array}
   */
  async execute(config = {}) {
    const response = { queries: [] };
    const inboundAjv = new Ajv({ useDefaults: true });
    const async = [];
    const history = {};

    // Set config defaults
    config.env = config.env || this.config.env;
    config.definitions = config.definitions || this.config.definitions;
    config.query = config.query || this.config.query;
    config.release = config.release || this.config.release;

    try {
      for (const query of config.queries) {
        // Do we have proper query schema?
        if (!this.validateRequest(query, inboundAjv)) {
          response.queries.push({
            ...this.getQueryName(query),
            error: {
              errno: 1000,
              code: 'ERROR_REQUEST_VALIDATION',
              details: inboundAjv.errors
            }
          });
          continue;
        }

        // Do we have proper definition query schema?
        let definition = config.definitions.find(q => q.name == query.name);
        if (!this.validateQueryDefinition(definition, inboundAjv)) {
          response.queries.push({
            ...this.getQueryName(query),
            error: {
              errno: 1001,
              code: 'ERROR_QUERY_DEFINITION_VALIDATION',
              details: inboundAjv.errors
            }
          });
          continue;
        }

        // Do we have sql?
        if (!definition) {
          response.queries.push({
            ...this.getQueryName(query),
            error: { errno: 1002, code: 'ERROR_QUERY_NOT_FOUND' }
          });
          continue;
        }

        // Do we have access rights?
        if (!intersection(definition.access, config.user.access).length) {
          response.queries.push({
            ...this.getQueryName(query),
            error: { errno: 1003, code: 'ERROR_QUERY_NO_ACCESS' }
          });
          continue;
        }

        // Do we have proper inbound query schema?
        if (!inboundAjv.validate(definition.inboundSchema, query.properties)) {
          response.queries.push({
            ...this.getQueryName(query),
            error: {
              errno: 1004,
              code: 'ERROR_QUERY_INBOUND_VALIDATION',
              details: inboundAjv.errors
            }
          });
        } else {
          let queryPromise = this.query(
            query,
            definition,
            config,
            config.user,
            history
          )
            .then(rows => {
              this.outbound(response, query, rows, definition, history);
            })
            .catch(error => this.queryError(error, query, response, config));

          if (query.sync) await queryPromise;
          else async.push(queryPromise);
        }
      }

      // Process all of the async queries here
      // The catch was defined above in the creation of the promise
      if (async.length) await Promise.all(async).catch(e => {});
    } catch (error) {
      // Do we have any uknown issues?
      let err = { error: { errno: 1007, code: 'ERROR_UNKNOWN' } };
      if (config.env == 'production') response.queries.push(err);
      else {
        err.details = error.message;
        response.queries.push(err);
      }
    } finally {
      if (typeof config.realease === 'function') config.release(response);
    }

    return response;
  }
}

/**
 * Init
 * @param {object} config
 */
module.exports = (config = {}) => {
  return new Superqequel(config);
};
