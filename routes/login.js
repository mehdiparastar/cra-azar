const express = require('express');
const router = express.Router();
const { User } = require('../model/user');


router.post('/', async (req, res) => {
    try {
        const { error } = await User.validateLogin(req);
        const findedUser = await User.findByCredentials(req);
        const token = await findedUser.generateAuthToken();
        const user = {
            firstName: findedUser.firstName,
            lastName: findedUser.lastName,
            email: findedUser.email,
            userAvatar: findedUser.userAvatar,
            orginizationRole: findedUser.orginizationRole,
            userRoles: findedUser.userRoles,
            token
        }
        res.header('x-auth-token', token).status(200).send(user);
    } catch (e) {
        res.status(400).json({
            Error: `Somethings went wrong. ${e}`
        });
    }
});

module.exports = router;