console.log('\n\n                               starting ...')

const path = require('path');
const config = require('config');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const fs = require('fs');

const _ = require('lodash');

const { accessControl } = require('./middleware/control_accesses');
const { authenticate } = require('./middleware/authenticate');

const { serverStatusLogger } = require('./middleware/server_status_logger_with_winston');
const requestLogger_with_morgan = fs.createWriteStream(path.join(__dirname, 'log/requests.log'));

const { User } = require('./model/user');

const app = express();
const router = express.Router();

const { Ostans, Shahrestans, Bakhshs, Shahrs, Dehestans, Abadis } = require('./model/CountryDivisions');

const login = require('./routes/login');
const { setHeaders } = require('./middleware/headers');

app.use(express.json());
app.use(setHeaders);

app.use(helmet());
app.use(morgan('combined', { stream: requestLogger_with_morgan }));

// require('./initializing/initializing')

app.use('/api/login', login);
// app.use('/api/common', commons)
// app.use('/api/pishkhan', pishkhans)


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
