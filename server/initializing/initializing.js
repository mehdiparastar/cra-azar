const { User } = require('../model/user');
const path = require('path');
const excelToJson = require('convert-excel-to-json');
const _ = require('lodash')
const { Ostans, Shahrestans, Bakhshs, Shahrs, Dehestans, Abadis } = require('../model/CountryDivisions');
const { One_to_Many_RelationShip } = require('../utils/utils')

/////////////////////////////////////ایجاد یوزر اولیه در دیتابیس/////////////////////////////////////////////////////
let testUser = new User({
    fullname: 'name family',
    email: 'family.name@gmail.com',
    password: 'fmfmfm',
    roles: ['admin', 'post_pishkhan_user']
})
Promise.all([
    testUser.save().then(() => console.log('user initialized')).catch(err => console.log('user exist'))
]).then(() => console.log(' --***-- user initializing finished --***-- ')).catch((err) => console.log(err))

//////////////////////////////خواندن اطلاعات تقسیمات کشوری از جداول اکسل و ذخیره در قالب جی سان///////////////////////////////////////////
const ostans_init_Data = excelToJson({
    sourceFile: path.join(__dirname, '../initializing/CountryDivision_Data_to_initializing/ostans.xlsx'),
    header: { rows: 1 },
    columnToKey: {
        'A': '{{A1}}',
        'B': '{{B1}}',
        'C': '{{C1}}',
        'D': '{{D1}}',
        'E': '{{E1}}',
        'F': '{{F1}}'
    }
});

const shahrestans_init_Data = excelToJson({
    sourceFile: path.join(__dirname, '../initializing/CountryDivision_Data_to_initializing/shahrestans.xlsx'),
    header: { rows: 1 },
    columnToKey: {
        'A': '{{A1}}',
        'B': '{{B1}}',
        'C': '{{C1}}',
        'D': '{{D1}}',
        'E': '{{E1}}',
        'F': '{{F1}}'
    }
});

const bakhshs_init_Data = excelToJson({
    sourceFile: path.join(__dirname, '../initializing/CountryDivision_Data_to_initializing/bakhshs.xlsx'),
    header: { rows: 1 },
    columnToKey: {
        'A': '{{A1}}',
        'B': '{{B1}}',
        'C': '{{C1}}',
        'D': '{{D1}}',
        'E': '{{E1}}',
        'F': '{{F1}}'
    }
});

const shahrs_init_Data = excelToJson({
    sourceFile: path.join(__dirname, '../initializing/CountryDivision_Data_to_initializing/shahrs.xlsx'),
    header: { rows: 1 },
    columnToKey: {
        'A': '{{A1}}',
        'B': '{{B1}}',
        'C': '{{C1}}',
        'D': '{{D1}}',
        'E': '{{E1}}',
        'F': '{{F1}}'
    }
});

const dehestans_init_Data = excelToJson({
    sourceFile: path.join(__dirname, '../initializing/CountryDivision_Data_to_initializing/dehestans.xlsx'),
    header: { rows: 1 },
    columnToKey: {
        'A': '{{A1}}',
        'B': '{{B1}}',
        'C': '{{C1}}',
        'D': '{{D1}}',
        'E': '{{E1}}',
        'F': '{{F1}}'
    }
});

const abadis_init_Data = excelToJson({
    sourceFile: path.join(__dirname, '../initializing/CountryDivision_Data_to_initializing/abadis.xlsx'),
    header: { rows: 1 },
    columnToKey: {
        'A': '{{A1}}',
        'B': '{{B1}}',
        'C': '{{C1}}',
        'D': '{{D1}}',
        'E': '{{E1}}',
        'F': '{{F1}}'
    }
});

//////////////////////////////////////ایجاد ارتباط بین جداول تقسیمات کشوری و ذخیره در پایگاه داده////////////////////////////////////

let ostan_dict = []
let shahrestan_dict = []
let bakhsh_dict = []
let dehestan_dict = []

ostan_dict = One_to_Many_RelationShip(ostans_init_Data.ostans, shahrestans_init_Data.shahrestans, Ostans, Shahrestans, 'shahrestans', 'ostan', 'Ostan_id', 'Shahrestan_id', 0, 2)
shahrestan_dict = One_to_Many_RelationShip(shahrestans_init_Data.shahrestans, bakhshs_init_Data.bakhshs, Shahrestans, Bakhshs, 'bakhshs', 'shahrestan', 'Shahrestan_id', 'Bakhsh_id', 0, 4)
bakhsh_dict = One_to_Many_RelationShip(bakhshs_init_Data.bakhshs, shahrs_init_Data.shahrs, Bakhshs, Shahrs, 'shahrs', 'bakhsh', 'Bakhsh_id', 'Shahr_id', 0, 6)
tmp_bakhsh = One_to_Many_RelationShip(bakhshs_init_Data.bakhshs, dehestans_init_Data.dehestans, Bakhshs, Dehestans, 'dehestans', 'bakhsh', 'Bakhsh_id', 'Dehestan_id', 0, 6)
dehestan_dict = One_to_Many_RelationShip(dehestans_init_Data.dehestans, abadis_init_Data.abadis, Dehestans, Abadis, 'abadis', 'dehestan', 'Dehestan_id', 'Abadi_id', 0, 10)
// console.log('*****************************', _.find(bakhsh_dict, { Bakhsh_id: '030303' }).dehestans)
// console.log('*****************************', _.find(bakhsh_dict_2, { Bakhsh_id: '030303' }).dehestans)

Promise.all([
    Ostans.collection.insertMany(ostan_dict).then((result) => { console.log('Ostan Initialized') }).catch((err) => { console.log('Ostan Exist') }),
    Shahrestans.collection.insertMany(shahrestan_dict).then((result) => { console.log('Shahrestan Initialized') }).catch((err) => { console.log('Shahrestan Exist') }),
    Bakhshs.collection.insertMany(bakhsh_dict).then((result) => { console.log('Bakhsh Initialized') }).catch((err) => { console.log('Bakhsh Exist') }),
    // Bakhshs.collection.insertMany(bakhsh_dict).then((result) => { console.log('Bakhsh Initialized') }).catch((err) => { console.log('Bakhsh Exist') }),
    Dehestans.collection.insertMany(dehestan_dict).then((result) => { console.log('Dehestan Initialized') }).catch((err) => { console.log('Dehestan Exist') }),
    Shahrs.collection.insertMany(shahrs_init_Data.shahrs).then((result) => { console.log('Shahr Initialized') }).catch((err) => { console.log('Shahr Exist') }),
    Abadis.collection.insertMany(abadis_init_Data.abadis).then((result) => { console.log('Abadi Initialized') }).catch((err) => { console.log('Abadi Exist') }),
]).then(() => console.log(' --***-- country division initializing finished --***-- ')).catch((err) => console.log(err))



