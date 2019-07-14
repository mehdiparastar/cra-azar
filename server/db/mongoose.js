const mongoose = require('mongoose');
const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config');

const config = require('config');

mongoose.Promise = global.Promise;

mongoose.connect(config.get('MONGOURI'), { useNewUrlParser: true });

mongoose.set('useCreateIndex', true);

module.exports = {
    mongoose
};
