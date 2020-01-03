const crypto = require('crypto')
const Mailer = require('@app/lib/mailer')
const server = require('@app/lib/server')
const UsersModel = require('@app/routes/users/models/users_model')


/**
 * Update Session User
 */
server.put('/users/session', async (req, res) => {

    try {
        const user = await UsersModel.getById(req.user.id)
        // If something weird happens, abort.
        if (!user.id) throw({'errno': 2000, 'code': 'ERROR_USER_NOT_FOUND'})

        if(req.body.password) {
            user.password = UsersModel.hashPassword(req.body.password, user.salt).password
        }

        if(req.body.name) user.name = req.body.name
        if(req.body.name) user.email = req.body.email
        await UsersModel.update(user)
        res.send({ token: UsersModel.token(user) })
    } catch(error) {
        return res.status(422).send({error})
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
        const user = await UsersModel.getById(response.insertId)
        res.send({ token: UsersModel.token(user) })
    } catch(error) {
        return res.status(422).send({error})
    }

})

/**
 * Forgot
 */
server.put('/users/forgot', async (req, res) => {

    try {
        const mail = new Mailer()
        const user = await UsersModel.getByEmail(req.body.email)
        // If something weird happens, abort.
        if (!user || !user.id) {
            throw({errno: 2002, code: 'ERROR_EMAIL_DOES_NOT_EXIST'})
        }

        user.reset_password = crypto.randomBytes(16).toString('hex')
        await UsersModel.update(user)
        let log = await mail.send({
            view: 'forgot',
            message: {
                subject: 'Contest Farm Password Reset',
                to: user.email,
                data: {
                    name: user.name,
                    url: 'http://' + req.headers.host + '/#/users/reset/' + user.id + '/' + user.reset_password}
            }
        })
        res.send(log)

    } catch(error) {
        return res.status(422).send({error})
    }
    
})

/**
 * Reset
 */
server.put('/users/reset', async (req, res) => {
    try {
        const user = await UsersModel.getByIdAndResetPassword(req.body.id)
        // If something weird happens, abort.
        if (!user.id) throw({'errno': 2000, 'code': 'ERROR_USER_NOT_FOUND'})

        user.reset_password = ''
        user.password = req.body.password

        await UsersModel.update(user)
        res.send({ token: UsersModel.token(user) })
    } catch(error) {
        return res.status(422).send({error})
    }

})
