const { User } = require('../model/user');
const path = require('path');
const excelToJson = require('convert-excel-to-json');
const _ = require('lodash')
const { Ostans, Shahrestans, Bakhshs, Shahrs, Dehestans, Abadis } = require('../model/CountryDivisions');

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

ostans_list = []
shahrestans_list = []
bakhshs_list = []
shahrs_list = []
dehestans_list = []
abadis_list = []

ostans_init_Data.ostans.forEach(ostan => {
    new_ostan = new Ostans(ostan)
    shahrestans_init_Data.shahrestans.forEach(shahrestan => {
        if (new_ostan.Ostan_id === shahrestan.Shahrestan_id.slice(0, 2)) {
            new_shahrestan = new Shahrestans(shahrestan)
            new_shahrestan.ostan = new_ostan
            new_ostan.shahrestans.push(new_shahrestan)
            bakhshs_init_Data.bakhshs.forEach(bakhsh => {
                if (new_shahrestan.Shahrestan_id === bakhsh.Bakhsh_id.slice(0, 4)) {
                    new_bakhsh = new Bakhshs(bakhsh)
                    new_bakhsh.shahrestan = new_shahrestan
                    new_shahrestan.bakhshs.push(new_bakhsh)
                    shahrs_init_Data.shahrs.forEach(shahr => {
                        if (new_bakhsh.Bakhsh_id === shahr.Shahr_id.slice(0, 6)) {
                            new_shahr = new Shahrs(shahr)
                            new_shahr.bakhsh = new_bakhsh
                            new_bakhsh.shahrs.push(new_shahr)
                            shahrs_list.push(new_shahr)
                        }
                    })
                    dehestans_init_Data.dehestans.forEach(dehestan => {
                        if (new_bakhsh.Bakhsh_id === dehestan.Dehestan_id.slice(0, 6)) {
                            new_dehestan = new Dehestans(dehestan)
                            new_dehestan.bakhsh = new_bakhsh
                            new_bakhsh.dehestans.push(new_dehestan)
                            abadis_init_Data.abadis.forEach(abadi => {
                                if (new_dehestan.Dehestan_id === abadi.Abadi_id.slice(0, 10)) {
                                    new_abadi = new Abadis(abadi)
                                    new_abadi.dehestan = new_dehestan
                                    new_dehestan.abadis.push(new_abadi)
                                    abadis_list.push(new_abadi)
                                }
                            })
                            dehestans_list.push(new_dehestan)
                        }
                    })
                    bakhshs_list.push(new_bakhsh)
                }
            })
            shahrestans_list.push(new_shahrestan)
        }
    })
    ostans_list.push(new_ostan)
});

Promise.all([
    console.log(' starting ...'),
    Ostans.collection.insertMany(ostans_list).then((result) => { console.log('Ostan Initialized') }).catch((err) => { console.log('Ostan Exist') }),
    Shahrestans.collection.insertMany(shahrestans_list).then((result) => { console.log('Shahrestan Initialized') }).catch((err) => { console.log('Shahrestan Exist') }),
    Bakhshs.collection.insertMany(bakhshs_list).then((result) => { console.log('Bakhsh Initialized') }).catch((err) => { console.log(err, 'Bakhsh Exist') }),
    Shahrs.collection.insertMany(shahrs_list).then((result) => { console.log('Shahr Initialized') }).catch((err) => { console.log('Shahr Exist') }),
    Dehestans.collection.insertMany(dehestans_list).then((result) => { console.log('Dehestan Initialized') }).catch((err) => { console.log('Dehestan Exist') }),
    Abadis.collection.insertMany(abadis_list).then((result) => { console.log('Abadi Initialized') }).catch((err) => { console.log('Abadi Exist') }),
]).then(() => console.log(' --***-- country division initializing finished --***-- ')).catch((err) => console.log(err))
