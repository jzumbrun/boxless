const Database = require('@app/lib/database')

class Model {
    constructor(){
        this._db = Database
        this._pool = this._db.getPool()
    }

    getPool(){
        return this._pool
    }

    getConnection(){
        return this._db.getConnection()
    }

    /**
     * Query
     * @param {string} sql 
     * @param {object} values 
     */
    async query(sql, values = {}, options={}) {
        const connection = await this.getConnection()
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (error, rows) => {
                if(error) reject(error)
                else if(options.first && rows[0]) resolve(rows[0])
                else if(options.first) resolve({})
                else resolve(rows)
            })
        })
    }

    /**
     * Query First
     * @param {string} sql 
     * @param {object} values 
     */
    queryFirst(sql, values = {}) {
        return this.query(sql, values, {first: true})
    }

    async release() {
        try {
            const connection = await this.getConnection()
            connection.release()
        } catch(error) {
            // Just ignore the error
        }
        
    }

    escape(query) {
        return this._pool.escape(query)
    }

    escapeId(query) {
        return this._pool.escapeId(query)
    }

}

module.exports = Model