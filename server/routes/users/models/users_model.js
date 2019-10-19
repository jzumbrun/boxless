const Model = require('@app/lib/model'),
    config = require('@app/config'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto')

class UsersModel extends Model{

    /**
     * Get current user
     * return promise
     */
    getCurrent(id) {
        return this.query('SELECT * FROM users WHERE id = ?', [id])
    }

    /**
     * Insert User
     * return promise
     */
    insert(email, password) {
        return this.validateUniqueEmail(email)
        .then(() => {
            var hash = this.hashPassword(password)
            return this.query('INSERT INTO users (email, password, salt) VALUES(?, ?, ?)', [email, hash.password, hash.salt])
        })
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
    token(id, email) {
        return jwt.sign({
            id: id,
            email: email
        }, config.secret, { expiresIn: '5h' })
    }
}

module.exports = new UsersModel()