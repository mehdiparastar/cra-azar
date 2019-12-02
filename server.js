console.log('\n\n\t\t\t starting ...')
const path = require('path');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const { serverStatusLogger } = require('./middleware/server_status_logger_with_winston');
const requestLogger_with_morgan = fs.createWriteStream(path.join(__dirname, 'log/requests.log'));
const app = express();
const login = require('./routes/login');
const users = require('./routes/users');
const { setHeaders } = require('./middleware/headers');
const { User } = require('./model/user');

app.use(express.json());
app.use(setHeaders);
app.use(helmet());
app.use(morgan('combined', { stream: requestLogger_with_morgan }));
app.use(morgan('tiny'));

app.use(async (req, res, next) => {

    const token = req.header('x-auth-token');
    const method = req.method;
    const api = req.originalUrl
    const clientIp = await req.header('client-ip');

    res.on('finish', () => {
        const statusCode = res.statusCode;
        if (statusCode)
            User.saveReqLog(token, method, api, clientIp, statusCode)
    })
    next();
})


// require('./initializing/initializing')

app.use('/api/login', login);
app.use('/api/users', users);
// app.use('/api/common', commons)
// app.use('/api/pishkhan', pishkhans)



app.listen(config.get('PORT'), () => { serverStatusLogger.info(`Server running on port ${config.get('PORT')}`); });



// const { Ostans, Shahrestans, Bakhshs, Shahrs, Dehestans, Abadis } = require('./model/CountryDivisions');

// app.post('/api/test1', authenticate, accessControl, async (req, res) => {
//     try {
//         let x = await {
//             reqUser: req.user,
//             reqToken: req.token,
//             reqPermission: req.permissions,
//             reqWhitelist: req.whitelist
//         };
//         res.status(200).send(x);
//     } catch (e) {
//         console.log(e);
//     }
// });

// const { accessControl } = require('./middleware/control_accesses');
