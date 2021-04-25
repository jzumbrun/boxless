const config = {}

/** DEFAULTS **/
config.defaults = {
  env: process.env.NODE_ENV,
  base: process.cwd(),
  port: 8081,
  db: {
    host: 'db',
    connectionLimit: 50,
    user: 'boxless',
    password: '#!boxless321321',
    database: 'boxless',
    dateStrings: true
  },
  mailProvider: {
    smtp: {
      service: '',
      auth: {
        user: '',
        pass: ''
      }
    },
    from: 'boxless'
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
    host: 'db',
    database: 'test',
    dateStrings: true
  },
  mailProvider: {
    smtp: null
  }
}

/** STAGING **/
config.staging = {}

/** PRODUCTION **/
config.production = {}

/* !!! DONT CHANGE THIS LINE !!! */
module.exports = new function () {
  return require('lodash').merge(config.defaults, config[process.env.NODE_ENV])
}()
