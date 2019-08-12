const winston = require('winston');
const path = require('path');

serverStatusLogger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(__dirname, '../log/server_status.log')
        })
    ]
});

module.exports = {
    serverStatusLogger
};
