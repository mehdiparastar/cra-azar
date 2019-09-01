const express = require('express');
const _ = require('lodash');
const router = express.Router();
const auth = require('../middleware/auth');
const { User } = require('../model/user');


router.post('/createuser', async (req, res) => {
    try {
        const { error } = User.validateCreateUser(req.body);
        if (error) {
            throw new Error('Validation Failed.');
        }
        // if (error) return res.status(400).send(error.details[0].message)

    } catch (ex) { return res.status(400).send(error.details[0].message) }

    try {
        let user = await User.findOne({ email: req.body.email })

        if (user) {
            throw new Error('duplicate Error')
        }
        user = new User(_.pick(req.body, ['firstname', 'lastname', 'email', 'password', 'preview', 'roles']))
        await user.save();
        return res.status(200).send(_.pick(user, ['_id', 'firstname', 'lastname', 'email', 'roles']))
        
        // if (user) return res.status(409).send({ error: 'کاربر از قبل تعریف شده است.' })
        // else {
        //     user = new User(_.pick(req.body, ['firstname', 'lastname', 'email', 'password', 'preview', 'roles']))
        //     await user.save();
        //     return res.status(200).send(_.pick(user, ['_id', 'firstname', 'lastname', 'email', 'roles']))
        // }
    } catch (ex) { return res.status(409).send({ error: 'کاربر از قبل تعریف شده است.' }) }
});


router.get('/userfirstname', auth, async (req, res) => {
    const token = req.header('x-auth-token');
    try {
        const finedUser = await User.findByToken(token)
        if (finedUser)
            return res.status(200).send(_.pick(finedUser, ['firstname']))
        return res.status(400).send('کاربری با این مشخصات وجود ندارد')
    } catch (e) {
        res.status(400).json({
            Error: `Somethings went wrong. ${e}`
        });
    }
})

router.get('/useravatar', auth, async (req, res) => {
    const token = req.header('x-auth-token');
    try {
        const finedUser = await User.findByToken(token)
        if (finedUser)
            return res.status(200).send(_.pick(finedUser, ['preview']))

        return res.status(400).send('کاربری با این مشخصات وجود ندارد')
    } catch (e) {
        res.status(400).json({
            Error: `Somethings went wrong. ${e}`
        });
    }
})

module.exports = router;