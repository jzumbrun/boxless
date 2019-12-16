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
        return this.queryFirst('SELECT * FROM users WHERE id = ?', [id])
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
        const exists = await this.validateUniqueEmail(email)
        if(exists.id) return exists
        let hash = this.hashPassword(password)
        return this.query('INSERT INTO users (name, email, password, salt, access) VALUES(?, ?, ?, ?, ?)',
                [name, email, hash.password, hash.salt, JSON.stringify(['user'])])
    }

    /**
     * Update User
     * return promise
     */
    async update(user) {
        const exist = await this.validateUniqueEmail(email)
        if(exist && (exists.id != user.id)){
            throw({'errno': 2001, 'code': 'ERROR_EMAIL_EXISTS'})
        }
        return this.query('INSERT INTO users (name, email, password) VALUES(?, ?, ?)', [user.name, user.email, user.password])
    }

    /**
     * Validate Unique Email
     * return promise
     */
    validateUniqueEmail(email = '') {
        return this.queryFirst('SELECT id FROM users WHERE email = ?', [email])
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