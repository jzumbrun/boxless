const Model = require('@app/lib/model')

class QueryModel extends Model {

    /**
     * Query
     * @param {string} query 
     * @param {object} params 
     * @param {User} user 
     * @return Promise
     */
    query(query, params = {}, user = {}) {

        // Replace with string values
        query = query.replace(/\/\*(\$\w+)\*\//g, (text, key) => {
            return params[key] ? this.escape(params[key]) : text
        // Replace with field ids
        }).replace(/\/\*(#\w+)\*\//g, (text, key) => {
            return params[key] ? this.escapeId(params[key]) : text
        // Replace with authorized values
        }).replace(/\/\*(@\w+)\*\//g, (text, key) => {
            return user[key] ? this.escape(user[key]) : text
        })

        return super.query(query)
    }
}

module.exports = new QueryModel()
