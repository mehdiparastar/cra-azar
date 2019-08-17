const express = require('express');
const router = express.Router();
const { User } = require('../model/user');


router.post('/', async (req, res) => {
    try {
        const { error } = await User.validateLogin(req);
                
        const findedUser = await User.findByCredentials(req);

        const token = await findedUser.generateAuthToken();

        res.header('x-auth-token', token).status(200).send(token);

    } catch (e) {
        res.status(400).json({
            Error: `Somethings went wrong. ${e}`
        });
    }
});

module.exports = router;