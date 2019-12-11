const express = require('express');
const _ = require('lodash');
const router = express.Router();
const auth = require('../middleware/auth');
const { accessControl } = require('../middleware/control_accesses')
const { User } = require('../model/user');
const moment = require('moment-jalaali')


router.post('/management/createuser', auth, accessControl, async (req, res) => {
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

router.get('/management/allusers', auth, accessControl, async (req, res) => {
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

router.get('/user', auth, accessControl, async (req, res) => {
    const token = req.header('x-auth-token');
    try {
        const finedUser = await User.findByToken(token)
        if (finedUser)
            return res.status(200).send(finedUser)
        return res.status(400).send('کاربری با این مشخصات وجود ندارد')
    } catch (e) {
        res.status(400).json({
            Error: `Somethings went wrong. ${e}`
        });
    }
})

router.put('/user-update', auth, accessControl, async (req, res) => {
    const token = req.header('x-auth-token');
    try {
        const finedUser = await User.findByToken(token)

        if (finedUser) {
            finedUser.firstName = req.body.firstName;
            finedUser.lastName = req.body.lastName;
            finedUser.email = req.body.email;
            await finedUser.save();
            return res.status(200).send()
        }
        return res.status(400).send('کاربری با این مشخصات وجود ندارد')
    } catch (e) {
        res.status(470).json({
            Error: `update failed. ${e}`
        });
    }
})

router.put('/user-change-password', auth, accessControl, async (req, res) => {
    const token = req.header('x-auth-token');
    try {
        const finedUser = await User.findByToken(token)

        if (finedUser) {
            finedUser.password = req.body.password;
            await finedUser.save();
            return res.status(200).send()
        }
        return res.status(400).send('کاربری با این مشخصات وجود ندارد')
    } catch (e) {
        res.status(470).json({
            Error: `update failed. ${e}`
        });
    }
})

router.put('/user-update-avatar', auth, accessControl, async (req, res) => {
    const token = req.header('x-auth-token');
    try {
        const finedUser = await User.findByToken(token)

        if (finedUser) {
            finedUser.userAvatar = req.body.userAvatar;
            await finedUser.save();
            return res.status(200).send()
        }
        return res.status(400).send('کاربری با این مشخصات وجود ندارد')
    } catch (e) {
        res.status(470).json({
            Error: `update failed. ${e}`
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

router.get('/management/:id', auth, accessControl, async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user)
        return res.status(404).send('There is no user for the given id.');

    res.status(200).send(user);
});

router.put('/management/:id', auth, accessControl, async (req, res) => {
    try {
        const { error } = User.validateUpdateUserInfo(req.body);
        if (error) {
            throw new Error('Validation Failed.');
        }
    } catch (ex) { return res.status(400).send(error.details[0].message) }

    try {
        let user = await User.findById(req.params.id)
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        if (req.body.password && req.body.password != "")
            user.password = req.body.password;
        user.userRoles = req.body.userRoles;
        user.orginizationRole = req.body.orginizationRole;

        await user.save();
        return res.status(200).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email', 'userRoles', 'orginizationRole']))
    } catch (ex) {
        console.log(ex)
        return res.status(422).send({ error: 'مشکل اعتبار سنجی!' })
    }
});

router.put('/management/tokens/:id', auth, accessControl, async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            tokens: [],
        },
        { new: true }
    );

    if (!user)
        return res.status(404).send('There is no user for the given id.');

    res.status(200).send(user);
});

router.get('/management/userReqLogs/:id', auth, accessControl, (req, res) => {

    // const user = await User.findById(req.params.id);

    // if (!user) {
    //     console.log(user.userReqLogs);
    //     return res.status(404).send('There is no user for the given id.');
    // }

    // res.status(200).send(user.userReqLogs);

    User.findById(req.params.id)
        .then((user) => {
            res.status(200).send(user.userReqLogs);
        })
        .catch((ex) => {
            res.status(404).send(ex);
        })
});

router.delete('/management/account/:id', auth, accessControl, async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user)
        return res.status(404).send('There is no user for the given id.');

    res.status(200).send(user);

});

router.delete('/management/users-accounts/:idlist', auth, accessControl, async (req, res) => {

    let cantDeleteUsersList = []
    req.params.idlist.split(',').map(async userId => {
        try {
            let deletedUser = await User.findByIdAndRemove(userId);
        } catch{
            cantDeleteUsersList = [...cantDeleteUsersList, userId]
        }
    })

    if (cantDeleteUsersList.length !== 0)
        return res.status(404).send(cantDeleteUsersList);

    res.status(200).send();

});

router.delete('/management/users-tokens/:idlist', auth, accessControl, async (req, res) => {

    let cantDeleteUsersTokensList = []
    req.params.idlist.split(',').map(async userId => {
        try {
            let deletedUserTokens = await User.findByIdAndUpdate(
                userId,
                {
                    tokens: [],
                },
                { new: true }
            );
        } catch{
            cantDeleteUsersTokensList = [...cantDeleteUsersTokensList, userId]
        }
    })

    if (cantDeleteUsersTokensList.length !== 0)
        return res.status(404).send(cantDeleteUsersTokensList);

    res.status(200).send();

});

router.post('/management/user-feed/:id', auth, accessControl, async (req, res) => {
    const token = req.header('x-auth-token');
    try {
        const finededUser = await User.findByToken(token)
        if (finededUser) {
            try {
                let user = await User.findOne({ _id: req.params.id })
                if (user) {
                    user.notifications.push({
                        seen: false,
                        title: req.body.feed,
                        type: 'bossFeed',
                        senderId: finededUser._id,
                        created_at: moment().format('jYYYY/jM/jD HH:mm:ss')
                    })
                    await user.save();
                    return res.status(200).send()
                }
                return res.status(400).send('کاربری با این مشخصات وجود ندارد')
            } catch (ex) {
                console.log(ex)
                return res.status(409).send({ error: ex })
            }
        }
        return res.status(401).send()
    } catch (e) {
        res.status(400).json({
            Error: `Somethings went wrong. ${e}`
        });
    }
});

router.get('/management/user-feed/:id', auth, accessControl, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.id })
        if (user) {
            return res.status(200).send(user.notifications)
        }
        return res.status(401).send()
    } catch (e) {
        res.status(400).json({
            Error: `Somethings went wrong. ${e}`
        });
    }
});

module.exports = router;