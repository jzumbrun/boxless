const UsersModel = require('../models/users_model')

var crypto = require('crypto'),
    config = require('../../../config')

module.exports = function (server) {

    /**
     * Current User Update
     */
    server.put('/users/current', function (req, res) {
        var User = mongoose.model('User')

        User.current(req.user._id, function(err, user) {

            // If something weird happens, abort.
            if (err || !user) {
                return res.status(422).send({errors: {user: {message: 'user_not_found'}}})
            }
            
            if(req.body.password){
                user.password = req.body.password
            }

            user.first_name = req.body.first_name
            user.last_name = req.body.last_name
            user.email = req.body.email
            
            user.save(function(err) {
                if (err) {
                    return res.status(422).send(err)
                }

                res.send({ token: user.token() })

            })

        })
    })

    /**
     * Sign in
     */
    server.put('/users/signin', function (req, res) {
        var User = mongoose.model('User'),
            Team = mongoose.model('Team')

        User.findOne({
            email: req.body.email,
             // Do NOT allow admin users. Let's keep them separate.
            roles: {$in: ['user']}
        }, function(err, user) {

            // If something weird happens, abort.
            if (err || !user) {
                return res.status(422).send({errors: {email: {message: 'email_not_found'}}})
            }
            
            if(!user.passwordMatches(req.body.password)){
                return res.status(422).send({errors: {password: {message: 'password_wrong'}}})
            }

            Team.findOne({_id: user.team_id}, function(err, team){
                // If something weird happens, abort.
                if (err) {
                    return res.status(422).send({errors: {team: {message: 'team_not_found'}}})
                }
                res.send({ subdomain: team.subdomain, token: user.token() })
            })

        })

    })
    
    /**
     * Sign up
     */
    server.post('/users/signup', function (req, res) {

        UserModel.insert(req.body.email, req.body.password)
        .then((users) => {
            let user = users[0]
            res.send({ token: UserModel.token(user.id, user.email) })
        })
        .catch((error) => {
            return res.status(422).send(error)
        })

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
