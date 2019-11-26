const express = require('express');
const _ = require('lodash');
const router = express.Router();
const auth = require('../middleware/auth');
const { accessControl } = require('../middleware/control_accesses')
const { User } = require('../model/user');


router.post('/createuser', auth, accessControl, async (req, res) => {
    try {
        const { error } = User.validateCreateUser(req.body);
        if (error) {
            throw new Error('Validation Failed.');
        }
    } catch (ex) { return res.status(400).send(error.details[0].message) }

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            throw new Error('duplicate Error')
        }
        user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'userAvatar', 'userRoles', 'orginizationRole']))
        await user.save();
        return res.status(200).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email', 'userRoles', 'orginizationRole']))
    } catch (ex) {
        console.log(ex)
        return res.status(409).send({ error: 'کاربر از قبل تعریف شده است.' })
    }
});

router.get('/allusers', auth, accessControl, async (req, res) => {
    try {
        const users = await User.find();
        if (!users)
            return res.status(400).send('هیچ کاربری تعریف نشده است.')

        res.status(200).send(users);
    } catch (e) {
        res.status(400).json({
            Error: `Somethings went wrong. ${e}`
        });
    }
})


router.get('/userfirstname', auth, accessControl, async (req, res) => {
    const token = req.header('x-auth-token');
    try {
        const finedUser = await User.findByToken(token)
        if (finedUser)
            return res.status(200).send(_.pick(finedUser, ['firstName']))
        return res.status(400).send('کاربری با این مشخصات وجود ندارد')
    } catch (e) {
        res.status(400).json({
            Error: `Somethings went wrong. ${e}`
        });
    }
})

router.get('/useravatar', auth, accessControl, async (req, res) => {
    const token = req.header('x-auth-token');
    try {
        const finedUser = await User.findByToken(token)
        if (finedUser)
            return res.status(200).send(_.pick(finedUser, ['userAvatar']))

        return res.status(400).send('کاربری با این مشخصات وجود ندارد')
    } catch (e) {
        res.status(400).json({
            Error: `Somethings went wrong. ${e}`
        });
    }
})

router.get('/:id', auth, accessControl, async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user)
        return res.status(404).send('There is no user for the given id.');

    res.status(200).send(user);
});

router.put('/:id', auth, accessControl, async (req, res) => {
    try {
        const { error } = User.validateUpdateUserInfo(req.body);
        if (error) {
            throw new Error('Validation Failed.');
        }
    } catch (ex) { return res.status(400).send(error.details[0].message) }

    const course = await User.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            orginizationRole: req.body.orginizationRole,
            userRoles: req.body.userRoles,
        },
        { new: true }
    );

    if (!course)
        return res.status(404).send('There is no course for the given id.');

    res.status(200).send(course);
});

module.exports = router;