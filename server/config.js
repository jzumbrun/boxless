const config = {}

/** DEFAULTS **/
config.defaults = {

    port: 8081,
    db: {
        connectionLimit : 50,
        host     : 'db',
        user     : 'supercontainer',
        password : '#!supercontainer321321',
        database : 'supercontainer'
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
        host     : 'db',
        database : 'test'
    },
}

/** STAGING **/
config.staging = {

}

/** PRODUCTION **/
config.production = {
}

/* !!! DONT CHANGE THIS LINE !!! */
module.exports = (new function(){process.env.NODE_ENV=config.defaults.env=process.env.NODE_ENV||require('./.env');return require('lodash').merge(config.defaults,config[config.defaults.env])}())