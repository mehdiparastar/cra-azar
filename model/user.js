const validator = require('validator');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');
const { mongoose } = require('../db/mongoose');
const { orginizationRoleMapper, userRolesMapper } = require('../utils/dropDownMapper')
const tokenOptions = { type: String, required: true };
const methodOptions = { type: String, required: false };
const apiOptions = { type: String, required: false };
const resCodeOptions = { type: String, required: false };
const clientIpOptions = { type: String, required: false };
const moment = require('moment-jalaali')


let UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 3, trim: true },
    lastName: { type: String, required: true, minlength: 3, trim: true },
    email: { type: String, required: true, minlength: 6, unique: true, validate: { validator: validator.isEmail, message: `{value} is not valid email` } },
    password: { type: String, required: true, minlength: 6 },
    tokens: [{ _id: false, access: tokenOptions, token: tokenOptions }],
    orginizationRole: { type: String, required: true, minlength: 3, trim: true },
    userRoles: [{ _id: false, type: String, required: true, minlength: 3 }],
    userAvatar: { type: String },
    regDate: { type: Date, default: moment().format('jYYYY/jM/jD HH:mm:ss') },
    userReqLogs: [{ _id: false, method: methodOptions, api: apiOptions, clientIp: clientIpOptions, resCode: resCodeOptions, time: { type: Date, default: moment().format('jYYYY/jM/jD HH:mm:ss') } }]
});

UserSchema.methods.toJSON = function () {
    let thisUser = this
    let userObject = thisUser.toObject()

    // userObject.userRoles = userRolesMapper(userObject.userRoles).join(' - ')
    // userObject.orginizationRole = orginizationRoleMapper(userObject.orginizationRole);
    return _.pick(userObject, ['_id', 'firstName', 'lastName', 'email', 'userRoles', 'orginizationRole', 'userAvatar', 'regDate'])
}

UserSchema.statics.findByCredentials = function (req) {
    let thisUser = this;
    const body = _.pick(req.body, ['email', 'password']);

    return thisUser.findOne({ email: body.email }).then(findedUser => {
        if (!findedUser) { Promise.reject(); }

        return new Promise((resolve, reject) => {
            bcrypt.compare(body.password, findedUser.password, (err, res) => {
                if (res) {
                    resolve(findedUser);
                } else {
                    reject();
                }
            });
        });
    });
};

UserSchema.methods.generateAuthToken = function () {
    let thisUser = this;
    let access = 'auth';

    let token = jwt.sign({ _id: thisUser._id.toHexString(), access: access }, config.get('JWT_SECRET')).toString()

    thisUser.tokens.push({ access, token })

    return thisUser.save().then(() => { return token })
};

UserSchema.statics.findByToken = function (token) {
    let thisUser = this
    let decoded

    try {
        decoded = jwt.verify(token, config.get('JWT_SECRET'))
    } catch (e) {
        return Promise.reject(e)
    }
    return thisUser.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': decoded.access
    })
}

UserSchema.statics.saveReqLog = function (token, method, api, clientIp, resCode) {
    let thisUser = this
    let decoded

    try {
        decoded = jwt.decode(token, config.get('JWT_SECRET'))
    } catch (e) {
        return Promise.reject(e)
    }
    if (decoded)
        thisUser.findOne({
            _id: decoded._id,
            'tokens.token': token,
            'tokens.access': decoded.access
        })
            .then((user) => {
                user.userReqLogs.push({ method, api, clientIp, resCode, time: moment().format('jYYYY/jM/jD HH:mm:ss') })
                user.save()
            })
            .catch((ex) => console.log(ex))
}

UserSchema.statics.validateLogin = function (req) {
    const joiSchema = {
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(255)
            .required()
    };
    return Joi.validate(req.body, joiSchema);
}

UserSchema.statics.validateCreateUser = function (req) {
    const joiSchema = {
        firstName: Joi.string().min(3).max(255).required(),
        lastName: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(12).required(),
        orginizationRole: Joi.array().items(Joi.string()).min(1).required(),
        userRoles: Joi.array().items(Joi.string()).min(1).required(),
        userAvatar: Joi.string().required()
    };
    return Joi.validate(req.body, joiSchema);
}

UserSchema.statics.validateUpdateUserInfo = function (req) {
    const joiSchema = {
        firstName: Joi.string().min(3).max(255).required(),
        lastName: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(12).required(),
        orginizationRole: Joi.array().items(Joi.string()).min(1).required(),
        userRoles: Joi.array().items(Joi.string()).min(1).required(),
    };
    return Joi.validate(req.body, joiSchema);
}

UserSchema.pre('save', function (next) {
    let thisUser = this;
    if (thisUser.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(thisUser.password, salt, (err, hash) => {
                thisUser.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});


let User = mongoose.model('User', UserSchema);


module.exports = {
    User
};
