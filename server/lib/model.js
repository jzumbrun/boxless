const Database = require('@app/lib/database')

class Model {
  constructor () {
    this._db = Database
  }

  getConnection () {
    return this._db.getConnection()
  }

  /**
   * Query
   * @param {string} sql
   * @param {object} values
   */
  async query (sql, values = [], options = {}) {
    const connection = this.getConnection()
    return new Promise((resolve, reject) => {
      connection.all(sql, values, (error, rows) => {
        if (error) reject(error)
        else if (options.first && rows[0]) resolve(rows[0])
        else if (options.first) resolve({})
        else resolve(rows)
      })
    })
  }

  /**
   * Query First
   * @param {string} sql
   * @param {object} values
   */
  queryFirst (sql, values = []) {
    return this.query(sql, values, { first: true })
  }

  async release () {
    try {
      const connection = this.getConnection()
      connection.close()
    } catch (error) {
      // Just ignore the error
    }
  }
}

module.exports = Model
