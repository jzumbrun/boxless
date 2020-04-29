const crypto = require('crypto')
const Mailer = require('../../../lib/mailer')
const server = require('../../../lib/server')
const UsersModel = require('../models/users_model')

/**
 * Update Session User
 */
server.put('/users/session', async (req, res) => {
  try {
    const user = await UsersModel.executeFirst('getById', { id: req.user.id })
    // If something weird happens, abort.
    if (!user.id) throw { errno: 2000, code: 'ERROR_USER_NOT_FOUND' } // eslint-disable-line

    const updateUser = { id: user.id }
    if (req.body.name) updateUser.name = req.body.name
    if (req.body.email) updateUser.email = req.body.email
    if (req.body.password) updateUser.password = req.body.password

    await UsersModel.update(updateUser)
    res.send({ token: UsersModel.token({ ...user, ...updateUser }) })
  } catch (error) {
    return res.status(422).send({ error })
  }
})

/**
 * Sign in
 */
server.put('/users/signin', async (req, res) => {
  try {
    const user = await UsersModel.getByEmailAndPassword(
      req.body.email,
      req.body.password
    )

    res.send({ token: UsersModel.token(user) })
  } catch (error) {
    return res.status(422).send({ error })
  }
})

/**
 * Sign up
 */
server.post('/users/signup', async (req, res) => {
  try {
    const response = await UsersModel.insert(
      req.body.name,
      req.body.email,
      req.body.password
    )
    const user = await UsersModel.executeFirst('getById', {
      id: response.insertId
    })
    res.send({ token: UsersModel.token(user) })
  } catch (error) {
    return res.status(422).send({ error })
  }
})

/**
 * Forgot
 */
server.put('/users/forgot', async (req, res) => {
  try {
    const mail = new Mailer()
    const user = await UsersModel.executeFirst('getByEmail', { email: req.body.email })
    // If something weird happens, abort.
    if (!user || !user.id) {
      throw { errno: 2002, code: 'ERROR_EMAIL_DOES_NOT_EXIST' } // eslint-disable-line
    }
    const updateUser = {
      id: user.id,
      reset: crypto.randomBytes(16).toString('hex')
    }
    await UsersModel.update(updateUser)
    const log = await mail.send({
      view: 'forgot',
      message: {
        subject: 'Bastion Base Password Reset',
        to: user.email,
        data: {
          name: user.name,
          url:
            'http://' +
            req.headers.host +
            '/#/users/reset/' +
            user.id +
            '/' +
            updateUser.reset
        }
      }
    })
    res.send(log)
  } catch (error) {
    return res.status(422).send({ error })
  }
})

/**
 * Reset
 */
server.put('/users/reset', async (req, res) => {
  try {
    const user = await UsersModel.executeFirst('getByIdAndResetPassword', { id: req.body.id, reset: req.body.reset })
    // If something weird happens, abort.
    if (!user.id) throw { errno: 2000, code: 'ERROR_USER_NOT_FOUND' } // eslint-disable-line

    await UsersModel.update({
      id: user.id,
      reset: '',
      password: req.body.password
    })
    res.send({ token: UsersModel.token(user) })
  } catch (error) {
    return res.status(422).send({ error })
  }
})
