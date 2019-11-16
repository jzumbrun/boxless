const Model = require('@app/lib/model'),
    config = require('@app/config'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto')

class UsersModel extends Model{

    /**
     * Get by Id
     * return promise
     */
    getById(id) {
        return this.query('SELECT * FROM users WHERE id = ?', [id])
    }

    /**
     * Get by email and access
     * return promise
     */
    getByEmailAndAccess(email) {
        return this.query('SELECT * FROM users WHERE email = ?', [email])
    }

    /**
     * Insert User
     * return promise
     */
    insert(name, email, password) {
        return this.validateUniqueEmail(email)
        .then(() => {
            var hash = this.hashPassword(password)
            console.log([name, email, hash.password, hash.salt, 'user', new Date().toISOString().slice(0, 19).replace('T', ' ')])
            return this.query('INSERT INTO users (name, email, password, salt, access, created_at) VALUES(?, ?, ?, ?, ?, ?)',
                [name, email, hash.password, hash.salt, 'user', new Date().toISOString().slice(0, 19).replace('T', ' ')])
        }).catch((err) => {
            console.log('@@@ERROR', err)
        })
    }

    /**
     * Update User
     * return promise
     */
    update(user) {
        return this.query('INSERT INTO users (email, password, salt) VALUES(?, ?, ?)', [email, hash.password, hash.salt])
    }

    /**
     * Validate Unique Email
     * return promise
     */
    validateUniqueEmail(email = '', id = 0) {
        return this.query('SELECT id FROM users WHERE email = ? AND id != ?', [email, id])
    }

    /**
     * Hash Password
     * return object
     */
    hashPassword(password) {
        let salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64')
        password = crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64')
        return {salt: salt, password: password}
    }

    /**
     * Password Matches
     * return boolean
     */
    passwordMatches(password) {
        return password && this.password === this.hashPassword(password)
    }

    /**
     * Token
     * return string
     */
    token(user) {
        return jwt.sign({
            id: user.id,
            email: user.email,
            access: user.access
        }, config.secret, { expiresIn: '5h' })
    }
}

module.exports = new UsersModel()