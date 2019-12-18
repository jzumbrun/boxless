const QueryModel = require('@app/routes/query/models/query_model'),
    seeds = require('@app/lib/test/seeds.json5'),
    deseeds = require('@app/lib/test/deseeds.json5')

    
module.exports.seed = async () => {
    for (query of seeds) {
        try {
            let rows = await QueryModel.query(query.expression)
        } catch(error) {
          console.log('   ', query.name, error)
        }
    }

    QueryModel.release()
}

module.exports.deseed = async () => {
    for (query of deseeds) {
        try {
            let rows = await QueryModel.query(query.expression)
        } catch(error) {
          console.log('   ', query.name, error)
        }
    }

    QueryModel.release()
}
