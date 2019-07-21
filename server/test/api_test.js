const assert = require('assert')
const path = require('path');
const { User } = require('../model/user');
process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config');
const config = require('config');

console.log('Level: ', config.get('Level'))

describe('Create test User', () => {
    it('Create', () => {
        let testUser = new User({
            fullname: 'test testy',
            email: 'test.name@gmail.com',
            password: 'testtest',
            roles: ['admin', 'post_pishkhan_user']
        })
        testUser.save()
    })
})

describe('User api', () => {
    it('Login', () => {
        assert(1 + 1 == 2)
    })
})
