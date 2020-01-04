const config = require('@app/config'),
  mysql = require('mysql');

class Database {
  constructor() {
    this._pool = {};
    this._connect();
    this._connection = null;
  }

  getPool() {
    return this._pool;
  }

  getConnection() {
    // Check request cache
    if (this._connection) return this._connection;
    return new Promise((resolve, reject) => {
      this._pool.getConnection((connection_error, connection) => {
        if (connection_error) return reject(connection_error);
        // Set to request cache
        this._connection = connection;
        return resolve(connection);
      });
    });
  }

  _connect() {
    this._pool = mysql.createPool(config.db);
  }
}

module.exports = new Database();
