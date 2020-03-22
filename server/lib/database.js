const config = require('@app/config')
const sqlite3 = require('sqlite3').verbose()

class Database {
  constructor () {
    this._connect()
    this._connection = {}
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

  _connect (name) {
    name = this._getName(name)
    return new Promise((resolve, reject) => {
      this._connection[name] = new sqlite3.Database(`./dbs/${name}.db`, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  }
}

module.exports = new Database()
