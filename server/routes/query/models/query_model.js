const Model = require('@app/lib/model')
const Handlebars = require('handlebars');

class QueryModule extends Model{

    /** 
     * Format
     * @query string
     * @ params array
     * return string
     */
    format(query='', req_params={}, user_params={}) {
        const template = Handlebars.compile(query)
        query = template({...req_params, ...user_params});
        // Replace with string values
        return query.replace(/\/\*(\$\w+)\*\//g, (text, key) => {
            return req_params[key] ? this.escape(req_params[key]) : text
        // Replace with field ids
        }).replace(/\/\*(#\w+)\*\//g, (text, key) => {
            return req_params[key] ? this.escapeId(req_params[key]) : text
        // Replace with authorized values
        }).replace(/\/\*(@\w+)\*\//g, (text, key) => {
            return user_params[key] ? this.escape(user_params[key]) : text
        })
    }
}

module.exports = new QueryModule()