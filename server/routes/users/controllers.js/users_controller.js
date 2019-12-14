const UsersModel = require('@app/routes/users/models/users_model')
const crypto = require('crypto')
const server = require('@app/lib/server')


/**
 * Current User Update
 */
server.put('/users', async (req, res) => {

    const user = await UsersModel.getById(req.user.id)

    // If something weird happens, abort.
    if (!user) {
        return res.status(422).send({'errno': 2000, 'code': 'ERROR_USER_NOT_FOUND'})
    }

    if(req.body.password) {
        user.password = UsersModel.hashPassword(req.body.password, user.salt)
    }

    user.name = req.body.name
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
server.put('/users/signin', async (req, res) => {
    try {
        const user = await UsersModel.getByEmailAndPassword(req.body.email, req.body.password)
        res.send({ token: UsersModel.token(user) })
    } catch(err) {
        res.status(422).send({'errno': 2000, 'code': 'ERROR_USER_NOT_FOUND'})
    }
})

/**
 * Sign up
 */
server.post('/users/signup', async (req, res) => {
    try {
        const response = await UsersModel.insert(req.body.name, req.body.email, req.body.password)
        const user = await UsersModel.getById(response.id || response.insertId)
        res.send({ token: UsersModel.token(user) })
    } catch(err) {
        return res.status(422).send({'err': err, 'errno': 2000, 'code': 'ERROR_USER_NOT_FOUND'})
    }

})

/**
 * Forgot
 */
server.post('/users/forgot', async (req, res) => {
    var User = mongoose.model('User'),
        mail = require('@app/lib/mailer'),
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
server.post('/users/reset', async (req, res) => {
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
