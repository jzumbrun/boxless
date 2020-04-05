const path = require('path')
const config = require('@app/config')
const sqlite3 = require('sqlite3').verbose()

class Database {
  constructor () {
    this._connection = {}
    this._connect()
  }

  _getName (name) {
    return name || config.db.name
  }

  async getConnection (name) {
    name = this._getName(name)
    // Check request cache
    if (this._connection[name]) return this._connection[name]
    await this._connect(name)
    return this._connection[name]
  }

  async _connect (name) {
    name = this._getName(name)
    try {
      this._connection[name] = await new sqlite3.Database(path.resolve(__dirname, `../dbs/${name}.db`))
    } catch (error) {
      throw Error(error)
    }
  }
}

module.exports = new Database()
