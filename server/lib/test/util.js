const config = require('@app/config')

module.exports.buildUrl = (url) => {
    return `http://localhost:${config.port}/${url}`
}