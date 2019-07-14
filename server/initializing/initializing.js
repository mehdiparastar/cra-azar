const { User } = require('../model/user');
const { Ostan, Shahrestan, Bakhsh, Dehestan_Shahr, Abadi } = require('../model/CountryDivisions');

let testUser = new User({
    fullname: 'name family',
    email: 'family.name@gmail.com',
    password: 'fmfmfm',
    roles: ['admin', 'post_pishkhan_user']
}).save().catch(err => err);





