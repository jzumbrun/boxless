const config = require('@app/config'),
    mysql = require('mysql')

class Database {
    constructor(){
        this._pool = {}
        this._connect()
    }

    getPool(){
        return this._pool
    }

    query(sql, values, callback){
        return new Promise((resolve, reject) => {
            this._pool.getConnection((connection_error, connection) => {
                if(connection_error) return reject(connection_error)
                connection.query(sql, values, (query_error, rows) => {
                    if(query_error) return reject(query_error)
                    return resolve(rows)
                })
            })
        })
    }

    _connect(){

        this._pool = mysql.createPool({
            connectionLimit: config.db.connectionLimit,
            host     : config.db.host,
            user     : config.db.user,
            password : config.db.password,
            database : config.db.database
        })

    }
}

module.exports = new Database()