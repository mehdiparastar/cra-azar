console.log('\n\n                               starting ...')
const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
// const winston = require('winston');
const fs = require('fs');
const _ = require('lodash');
const persianDate = require('persian-date');
const Joi = require('joi');
const { accessControl } = require('./middleware/control_accesses');
const { authenticate } = require('./middleware/authenticate');
const { serverStatusLogger } = require('./middleware/server_status_logger_with_winston');
const { User } = require('./model/user');
const app = express();
const requestLogger_with_morgan = fs.createWriteStream(path.join(__dirname, 'log/requests.log'));

app.use(express.json());

app.use(helmet());

app.use(morgan('combined', { stream: requestLogger_with_morgan }));

require('../server/initializing/initializing')

app.post('/api/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        let findedUser = await User.findByCredentials(
            body.email,
            body.password
        );

        let token = await findedUser.generateAuthToken();

        res.header('x-auth', token)
            .status(200)
            .send(token);
    } catch (e) {
        res.status(400).json({
            Error: `Somethings went wrong. ${e}`
        });
    }
});

app.post('/api/test1', authenticate, accessControl, async (req, res) => {
    try {
        let x = await {
            reqUser: req.user,
            reqToken: req.token,
            reqPermission: req.permissions,
            reqWhitelist: req.whitelist
        };
        res.status(200).send(x);
    } catch (e) {
        console.log(e);
    }
});

app.get('/mehdi', (req, res) => { res.send('hello'); });


app.listen(config.get('PORT'), () => { serverStatusLogger.info(`Server running on port ${config.get('PORT')}`); });
