const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Model = require('@app/lib/model')
const config = require('@app/config')

class UsersModel extends Model {

    /**
     * Get by Id
     * return promise
     */
    getById(id) {
        return this.queryFirst('SELECT * FROM users WHERE id = ?', [id])
    }
    
    /**
     * Get By Email
     * return promise
     */
    getByEmail(email = '') {
        return this.queryFirst('SELECT id, name, email FROM users WHERE email = ?', [email])
    }

    /**
     * Get by email and access
     * return promise
     */
    async getByEmailAndPassword(email, password) {
        const user = await this.queryFirst('SELECT * FROM users WHERE email = ?', [email])
        const matches = this.passwordMatches(password, user)
        if (!user || !matches)
            throw('ERROR_USER_NOT_FOUND')
        return user
    }

    /**
     * Insert User
     * return promise
     */
    async insert(name, email, password) {
        const exists = await this.getByEmail(email)
        if(exists.id) throw ({'errno': 2001, 'code': 'ERROR_EMAIL_EXISTS'})
        let hash = this.hashPassword(password)
        return this.query('INSERT INTO users (name, email, password, salt, access) VALUES(?, ?, ?, ?, ?)',
                [name, email, hash.password, hash.salt, JSON.stringify(['user'])])
    }

    /**
     * Update User
     * return promise
     */
    async update(user) {
        if(user.email) {
            let exists = await this.getByEmail(user.email)
            if(exists && exists.id && (exists.id != user.id)){
                throw({'errno': 2001, 'code': 'ERROR_EMAIL_EXISTS'})
            }
        }

        let query = 'UPDATE users SET '
        let fields = []
        for(const field in user) {
            if(field !== 'id') {
                fields.push(`${field}=${this.escape(user[field])}`)
            }
        }
        query = query.concat(fields.join(', '))
        query = query.concat(` WHERE id=${this.escape(user.id)}`)
        return this.query(query)
    }

    /**
     * Hash Password
     * return object
     */
    hashPassword(password, salt=null) {
        if(!salt)
            salt = crypto.randomBytes(16).toString('hex')
        const saltedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex')
        return {salt: salt, password: saltedPassword}
    }

    /**
     * Password Matches
     * return boolean
     */
    passwordMatches(password, user) {
        const hashedPassword = this.hashPassword(password, user.salt).password
        return user.password === hashedPassword
    }

    /**
     * Token
     * return string
     */
    token(user) {
        return jwt.sign({
            id: user.id,
            email: user.email,
            access: JSON.parse(user.access)
        }, config.secret, { expiresIn: '24h' })
    }
}

module.exports = new UsersModel()