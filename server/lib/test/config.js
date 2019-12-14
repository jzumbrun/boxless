require('module-alias/register')
const seeder = require('@app/lib/test/seeder')

seeder.seed()
process.removeAllListeners('SIGINT')

module.exports = {}