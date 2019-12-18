require('module-alias/register')
require('json5/lib/register')

process.removeAllListeners('SIGINT')
process.env.NODE_ENV = 'testing'

module.exports = {}