const _ = require('lodash')
const hbs = require('handlebars')
const Model = require('@app/lib/model')

class QueryModel extends Model {

    constructor() {
        super()
        for(const fn in _) {
            hbs.registerHelper(`_${fn}`, function(...args) {
                return _[fn](...args)
            })
        }
    }

    /**
     * Query
     * @param {string} query 
     * @param {object} properties 
     * @param {User} user 
     * @return Promise
     */
    query(query, properties = {}, user = {}) {
        query = hbs.compile(query)({...properties, user})
        return super.query(query)
    }

}

module.exports = new QueryModel()
