const { User } = require('../model/user')

const auth = async (req, res, next) => {
    const token = await req.header('x-auth-token')
    User.findByToken(token).then((user) => {
        if (!user) {
            return promise.reject()
        }
        req.user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            orginizationRole: user.orginizationRole,
            userRoles: user.userRoles
        }
        req.token = token
        next()
    }).catch(err => res.status(401).send(err))
}

module.exports = auth

