const QueriesModel = require('@app/routes/queries/models/queries_model')

module.exports.seed = async seed => {
  const seeds = require(`@app/lib/test/seeds/${seed}_seeds.json5`)
  console.log('   Seeding for', process.env.NODE_ENV)
  for (const query of seeds) {
    try {
      await QueriesModel.query(query.expression)
    } catch (error) {
      console.log('   ', query.name, error)
    }
  }

  QueriesModel.release()
}

module.exports.deseed = async seed => {
  const deseeds = require(`@app/lib/test/seeds/${seed}_deseeds.json5`)
  console.log('   Deseeding for', process.env.NODE_ENV)
  for (const query of deseeds) {
    try {
      await QueriesModel.query(query.expression)
    } catch (error) {
      console.log('   ', query.name, error)
    }
  }

  QueriesModel.release()
}
