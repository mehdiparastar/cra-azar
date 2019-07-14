const { User } = require('../model/user')

let authenticate = (req, res, next) => {
    let token = req.header('x-auth')

    User.findByToken(token).then((user) => {

        if (!user) {
            return promise.reject()
        }
        req.user = { 
            _id: user._id, 
            fullname: user.fullname, 
            email: user.email,
            roles: user.roles
        }
        req.token = token
        next()
    }).catch((err) => {
        res.status(401).send()
    })
}

module.exports = {
    authenticate
}