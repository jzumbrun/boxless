const QueryModel = require('@app/routes/query/models/query_model'),
    seeds = require('@app/lib/test/seeds.json5'),
    deseeds = require('@app/lib/test/deseeds.json5')

    
module.exports.seed = async () => {
    console.log('   Seeding for', process.env.NODE_ENV)
    for (query of seeds) {
        try {
            await QueryModel.query(query.expression)
        } catch(error) {
          console.log('   ', query.name, error)
        }
    }

    QueryModel.release()
}

module.exports.deseed = async () => {
    console.log('   Deseeding for', process.env.NODE_ENV)
    for (query of deseeds) {
        try {
            await QueryModel.query(query.expression)
        } catch(error) {
          console.log('   ', query.name, error)
        }
    }

    QueryModel.release()
}
