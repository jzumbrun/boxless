require('module-alias/register')

const QueryModel = require('@app/routes/query/models/query_model'),
    seeds = require('@app/lib/test/seeds')


module.exports.seed = async () => {
    for (query of seeds) {
        try {
            let rows = await QueryModel.query(query.expression)
            console.log('      SEEDED:', query.name)
        } catch(error) {
          console.log('      ERROR SEEDING:', query.name, error)
        }
    }

    QueryModel.release()
}
