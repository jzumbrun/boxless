const UsersModel = require('../models/users_model')

var crypto = require('crypto'),
    config = require('../../../config')

module.exports = function (server) {

    /**
     * Current User Update
     */
    server.put('/users/current', async (req, res) => {

        const user = await UsersModel.getById(req.user._id)

        // If something weird happens, abort.
        if (err || !user) {
            return res.status(422).send({'errno': 2000, 'code': 'ERROR_USER_NOT_FOUND'})
        }

        if(req.body.password) {
            user.password = req.body.password
        }

        user.first_name = req.body.first_name
        user.last_name = req.body.last_name
        user.email = req.body.email

        try {
            await UsersModel.update(user)
            res.send({ token: UsersModel.token(user) })
        } catch(err) {
            return res.status(422).send(err)
        }

    })

    /**
     * Sign in
     */
    server.put('/users/signin',  async (req, res) => {
        try {
            const user = await UsersModel.getByEmailAndAccess({
                email: req.body.email,
                 // Do NOT allow admin users. Let's keep them separate.
                access: 'user'
                })
            if (!user || !user.passwordMatches(req.body.password))
                return res.status(422).send({'errno': 2000, 'code': 'ERROR_USER_NOT_FOUND'})
        } catch(err) {
            return res.status(422).send({'errno': 2000, 'code': 'ERROR_USER_NOT_FOUND'})
        }
    })
    
    /**
     * Sign up
     */
    server.post('/users/signup', async (req, res) => {
        try {
            console.log('@@@/users/signup', req.body)
            const response = await UsersModel.insert(req.body.name, req.body.email, req.body.password)
            const user = await UserModel.getById(response.id)
            res.send({ token: user[0].token() })
        } catch(err) {

            return res.status(422).send({'err': err, 'errno': 2000, 'code': 'ERROR_USER_NOT_FOUND'})
        }

    })

    /**
     * Forgot
     */
    server.put('/users/forgot', function (req, res) {
        var User = mongoose.model('User'),
            mail = require(config.base + 'server/lib/mailer')(server),
            message = {}

        User.findOne({
            email: req.body.email
        }, function(err, user) {

            // If something weird happens, abort.
            if (err || !user) {
                return res.status(422).send({errors: {email: {message: 'email_not_found'}}})
            }

            user.reset_password = crypto.randomBytes(16).toString('hex')
            user.save(function(err) {

                if (err) {
                    return res.status(422).send(err)
                }

                message = mail.send({
                    view: 'forgot',
                    message: {
                        subject: 'Contest Farm Password Reset',
                        to: user.email,
                        data: {
                            first_name: user.first_name, 
                            url: 'http://' + req.headers.host + '/#/users/reset/' + user._id + '/' + user.reset_password}
                    }
                })

                console.log('Message', message)

                res.send({message: 'emailed_password_reset'})

            })


        })
    })

    /**
     * Reset
     */
    server.put('/users/reset', function (req, res) {
        var User = mongoose.model('User')

        User.findOne({
            _id: req.body._id,
            reset_password: req.body.reset_password
        }, function(err, user) {

            // If something weird happens, abort.
            if (err || !user) {
                return res.status(422).send({errors: {email: {message: 'reset_password_wrong'}}})
            }

            user.reset_password = ''
            user.password = req.body.password
            user.save(function(err) {
                if (err) {
                    return res.status(422).send(err)
                }

                res.send({ token: user.token() })

            })

        })
    })

}
