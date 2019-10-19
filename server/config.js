const config = {}

/** DEFAULTS **/
config.defaults = {

    port: 80,
    db: {
        connectionLimit : 50,
        host     : '0.0.0.0',
        user     : 'paramly',
        password : '#!paramly321321',
        database : 'paramly'
    },

    secret: '4Rf3FvgtRgYg60KjM',

    open_paths: [
        '/',
        '/query'
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
module.exports = (new function(){config.defaults.env=require('../.env');return require('lodash').merge(config.defaults,config[config.defaults.env])}())