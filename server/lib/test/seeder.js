const QueryModel = require('@app/routes/query/models/query_model')

    
module.exports.seed = async (seed) => {
    const seeds = require(`@app/lib/test/seeds/${seed}_seeds.json5`)
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

module.exports.deseed = async (seed) => {
    const deseeds = require(`@app/lib/test/seeds/${seed}_deseeds.json5`)
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
