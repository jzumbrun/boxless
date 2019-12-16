const config = {}

/** DEFAULTS **/
config.defaults = {

    port: 8081,
    db: {
        connectionLimit : 50,
        host     : 'db',
        user     : 'sqlstache',
        password : '#!sqlstache321321',
        database : 'sqlstache'
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
config.development = {
    port: 8081
}

/** TESTING **/
config.testing = {

    db: {
        host: 'localhost',
        database: 'test'
    }
}

/** STAGING **/
config.staging = {

    db: {
        host: 'localhost',
        database: 'test'
    }
}

/** PRODUCTION **/
config.production = {
}

/* !!! DONT CHANGE THIS LINE !!! */
module.exports = (new function(){config.defaults.env=require('./.env');return require('lodash').merge(config.defaults,config[config.defaults.env])}())