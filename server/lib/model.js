const Database = require('@app/lib/database')

class Model {
    constructor(){
        this._db = Database
        this._pool = this._db.getPool()
    }

    getPool(){
        return this._pool
    }

    getConnection(callback){
        return this._pool.getConnection(callback)
    }

    query(sql, values, callback) {
        return this.db.query(sql, values, callback)
    }

    escape(query) {
        return this._pool.escape(query)
    }

    escapeId(query) {
        return this._pool.escapeId(query)
    }

}

module.exports = Model