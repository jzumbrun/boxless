const config = {}

/** DEFAULTS **/
config.defaults = {
  port: 8081,
  db: {
    name: 'development'
  },
  mailProvider: {
    smtp: {
      service: '',
      auth: {
        user: '',
        pass: ''
      }
    },
    from: 'Supercontainer'
  },

  secret: '4Rf3FFgtRgFg60KPM',

  open_paths: [
    '/',
    '/users/signup',
    '/users/signin',
    '/users/reset',
    '/users/forgot'
  ]
}

/** DEVELOPMENT **/
config.development = {}

/** TESTING **/
config.testing = {
  db: {
    name: 'test'
  },
  mailProvider: {
    smtp: null
  }
}

/** STAGING **/
config.staging = {
  db: {
    name: 'staging'
  }
}

/** PRODUCTION **/
config.production = {
  db: {
    name: 'production'
  }
}

/* !!! DONT CHANGE THIS LINE !!! */
module.exports = new function () {
  process.env.NODE_ENV = config.defaults.env =
    process.env.NODE_ENV || require('./.env')
  return require('lodash').merge(config.defaults, config[config.defaults.env])
}()
