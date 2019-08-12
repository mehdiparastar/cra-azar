const config = require('config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.get('MONGOURI'), { useNewUrlParser: true });
mongoose.connection
    .once('open', () => console.log(' --***-- connecting to db is successful! --***-- '))
    .on('error', (error) => console.warn('Warning', error))
mongoose.set('useCreateIndex', true);

if (config.get('Level') === 'test') {
    beforeEach((done) => {
        mongoose.connection.collections.users.drop(() => {
            done();
        });
    });
}
module.exports = {
    mongoose
};
