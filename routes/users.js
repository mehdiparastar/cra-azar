const express = require('express');
const _ = require('lodash');
// const bcrypt = require('bcrypt');
const router = express.Router();
const auth = require('../middleware/authenticate');
const { User } = require('../model/user');

router.post('/', auth, async (req, res) => {
    const { error } = User.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('کاربر از قبل تعریف شده است.');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'roles']));

    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();

    res.status(200).send(_.pick(user, ['_id', 'name', 'email', 'roles']));
});

router.get('/userfullname', auth, async (req, res) => {
    const finedUser = User.findByToken(req.body.token)
    if (finedUser)
        res.status(200).send(_.pick(finedUser, ['fullname']))
    else
        return res.status(400).send('User already registered.')

})

module.exports = router;