const _ = require('lodash');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const config = require('@app/config');
const Model = require('@app/lib/model');
const definitions = require('@app/routes/users/models/defined_queries.json5');
const supersequel = require('@app/supersequel')({
  helpers: [{ functions: _, prefix: '_' }],
  definitions: definitions,
  query: query => {
    return module.exports.query(query);
  }
});

class UsersModel extends Model {
  /**
   * Execute
   * @param {string} name
   * @param {object} properties
   */
  async execute(name, properties = {}, first = false) {
    const results = await supersequel.execute({
      queries: [{ name, properties }],
      user: { id: -1, access: ['system'] }
    });

    if (first) return results.queries[0].results[0];
    else return results.queries[0].results;
  }

  /**
   * Execute
   * @param {string} name
   * @param {object} properties
   */
  executeFirst(name, properties = {}) {
    return this.execute(name, properties, true);
  }

  /**
   * Supersequel
   * @param {array} queries
   */
  supersequel(queries) {
    return supersequel.execute({ queries });
  }

  /**
   * Get By Email
   * @return promise
   */
  getByEmail(email = '') {
    return this.queryFirst(
      'SELECT id, name, email FROM users WHERE email = ?',
      [email]
    );
  }

  /**
   * Get by email and access
   * return promise
   */
  async getByEmailAndPassword(email, password) {
    const user = await this.queryFirst('SELECT * FROM users WHERE email = ?', [
      email
    ]);
    const matches = this.passwordMatches(password, user);
    if (!user || !matches) throw 'ERROR_USER_NOT_FOUND';
    return user;
  }

  /**
   * Insert User
   * @return promise
   */
  async insert(name, email, password) {
    const exists = await this.getByEmail(email);
    if (exists.id) throw { errno: 2001, code: 'ERROR_EMAIL_EXISTS' };
    let hash = this.hashPassword(password);
    return this.query(
      'INSERT INTO users (name, email, password, salt, access) VALUES(?, ?, ?, ?, ?)',
      [name, email, hash.password, hash.salt, JSON.stringify(['user'])]
    );
  }

  /**
   * Update User
   * @return promise
   */
  async update(user) {
    if (user.email) {
      let exists = await this.getByEmail(user.email);
      if (exists && exists.id && exists.id != user.id) {
        throw { errno: 2001, code: 'ERROR_EMAIL_EXISTS' };
      }
    }
    return this.execute('update', { id: user.id, resource: user });
  }

  /**
   * Hash Password
   * @return object
   */
  hashPassword(password, salt = null) {
    if (!salt) salt = crypto.randomBytes(16).toString('hex');
    const saltedPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha256')
      .toString('hex');
    return { salt: salt, password: saltedPassword };
  }

  /**
   * Password Matches
   * @return boolean
   */
  passwordMatches(password, user) {
    const hashedPassword = this.hashPassword(password, user.salt).password;
    return user.password === hashedPassword;
  }

  /**
   * Token
   * @return string
   */
  token(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        access: JSON.parse(user.access)
      },
      config.secret,
      { expiresIn: '24h' }
    );
  }
}

module.exports = new UsersModel();
