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
    const connection = await this.getConnection()
    return new Promise((resolve, reject) => {
      // Select statements
      if (sql.toLowerCase().indexOf('select') === 0) {
        connection.all(sql, values, function (error, rows) {
          if (error) reject(error)
          else if (options.first && rows[0]) resolve(rows[0])
          else if (options.first) resolve({})
          else resolve(rows)
        })
      } else { // All other statements
        connection.run(sql, values, function (error) {
          if (error) reject(error)
          resolve({ insertId: this.lastID })
        })
      }
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
