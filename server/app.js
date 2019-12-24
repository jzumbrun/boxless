require('module-alias/register')
require('json5/lib/register')

const parser = require('body-parser')
const compression = require('compression')
const jwt = require('express-jwt')
const config = require('@app/config')
const server = require('@app/lib/server')
const controllers = require('@app/lib/controllers')
const layouts = require('@app/lib/layouts')

/**
 *  Define the server
 */
class App {

    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    terminator(sig) {
        if (typeof sig === 'string') {
            console.log('%s: Received %s - terminating server ...',
                Date(Date.now()), sig)
            process.exit(1)
        }
        console.log('%s: Node server stopped.', Date(Date.now()))
    }

    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    setupTerminationHandlers() {
        //  Process on exit and signals.
        process.on('exit', () => {
            this.terminator()
        })

        var signals = ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ]
        signals.forEach((element, index) => {
            process.on(element, () => this.terminator(element))
        })
    }


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    initialize() {

        server.use(compression())
        server.use(parser.json())
        server.use(parser.urlencoded({ extended: true }))

        // We are going to protect routes with JWT
        server.use(jwt({
            secret: config.secret
        }).unless({
            path: config.open_paths
        }))

        // Load the controllers
        controllers.load()
        // Load the layouts
        layouts.load()

        // View engine setup
        server.set('view engine', 'hbs')

        // Error handlers
        this.errors()

    }

    /**
     *  Set Error Handlers
     */
    errors() {

        // catch 404 and forward to error handler
        server.use((req, res, next) => {
            let err = new Error('not_found')
            err.status = 404
            next(err)
        })

        // development error handler
        // will print stacktrace
        server.use((err, req, res, next) => {
            res.status(err.status || 500).send({
                message: err.message,
                error: err
            })

        })

    }

    /**
     *  Start the server (starts up the sample serverlication).
     */
    start() {
        this.setupTerminationHandlers()

        // Create the express server and routes.
        this.initialize()

        server.listen(config.port, (err) => {
            console.log('App started at %s on %s:%d ...', Date(Date.now()), '127.0.0.1', config.port)
        })

    }

}

var app = new App()
app.start()
module.exports = app