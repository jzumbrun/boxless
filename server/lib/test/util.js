const config = require('../../config')

module.exports.buildUrl = url => {
  return `http://localhost:${config.port}/${url}`
}
