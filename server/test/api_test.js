const assert = require('assert')
const path = require('path');

process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config');
const config = require('config');

console.log('*****************   test   *******************', config.get('Level'))
describe('User api', () => {
    it('Login', () => {
        assert(1 + 1 == 2)
    })
})
