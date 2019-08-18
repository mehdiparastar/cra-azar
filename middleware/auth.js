const { User } = require('../model/user')

const auth = async(req, res, next) => {    
    const token =await req.header('x-auth-token')
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
        res.status(401).send(err)
    })
}

module.exports = auth

