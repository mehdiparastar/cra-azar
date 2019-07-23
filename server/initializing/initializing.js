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

ostans_init_Data.ostans.forEach(ostan => {
    new_ostan = new Ostans(ostan)
    shahrestans_init_Data.shahrestans.forEach(shahrestan => {
        new_shahrestan = new Shahrestans(shahrestan)
        new_ostan.shahrestans.push(new_shahrestan)
        bakhshs_init_Data.bakhshs.forEach(bakhsh => {
            new_bakhsh = new Bakhshs(bakhsh)
            new_shahrestan.bakhshs.push(new_bakhsh)
            shahrs_init_Data.shahrs.forEach(shahr=>{
                new_shahr=new Shahrs(shahr)
                new_bakhsh.shahrs.push(new_shahr)
                Promise.all([
                    new_ostan.save(),
                    new_shahrestan.save(),
                    new_bakhsh.save(),
                    new_shahr.save()
                ])
            dehestans_init_Data.dehestans.forEach(dehestan=>{
                new_dehestan=new Dehestans(dehestan)
                new_bakhsh.dehestans.push(new_dehestan)
                abadis_init_Data.abadis.forEach(abadi=>{
                    new_abadi= new Abadis(abadi)
                    new_dehestan.abadis.push(new_abadi)
                    Promise.all([
                        new_ostan.save(),
                        new_shahrestan.save(),
                        new_bakhsh.save(),
                        new_dehestan.save(),
                        new_abadi.save()
                    ])
                })
            })
            })
        })
    })
});

//////////////////////////////////////ایجاد ارتباط بین جداول تقسیمات کشوری و ذخیره در پایگاه داده////////////////////////////////////

// let ostan_dict = []
// let shahrestan_dict = []
// let bakhsh_dict = []
// let dehestan_dict = []

// ostan_shahrestans_One_side_object = {
//     One_side_data: ostans_init_Data.ostans,
//     One_side_Model: Ostans,
//     Many_Side_One_field: 'ostan',
//     One_Side_id_field: 'Ostan_id',
// }
// ostan_shahrestans_Many_side_objects = [{
//     Many_side_data: shahrestans_init_Data.shahrestans,
//     Many_side_Model: Shahrestans,
//     One_Side_Many_field: 'shahrestans',
//     Many_side_id_field: 'Shahrestan_id',
//     Many_side_first_slice_index: 0,
//     Many_side_second_slice_index: 2
// }]
// ostan_dict, shahrestans_many = One_to_Many_RelationShip(ostan_shahrestans_One_side_object, ostan_shahrestans_Many_side_objects)
// console.log(shahrestans_many)
// shahrestan_bakhshs_One_side_object = {
//     One_side_data: shahrestans_many,
//     One_side_Model: Shahrestans,
//     Many_Side_One_field: 'shahrestan',
//     One_Side_id_field: 'Shahrestan_id',
// }
// shahrestan_bakhshs_Many_side_objects = [{
//     Many_side_data: bakhshs_init_Data.bakhshs,
//     Many_side_Model: Bakhshs,
//     One_Side_Many_field: 'bakhshs',
//     Many_side_id_field: 'Bakhsh_id',
//     Many_side_first_slice_index: 0,
//     Many_side_second_slice_index: 4
// }]
// shahrestan_dict, bakhshs_many = One_to_Many_RelationShip(shahrestan_bakhshs_One_side_object, shahrestan_bakhshs_Many_side_objects)

// bakhsh_shahrs_and_dehestans_One_side_object = {
//     One_side_data: bakhshs_init_Data.bakhshs,
//     One_side_Model: Bakhshs,
//     Many_Side_One_field: 'bakhsh',
//     One_Side_id_field: 'Bakhsh_id',
// }
// bakhsh_shahrs_and_dehestans_Many_side_objects = [{
//     Many_side_data: shahrs_init_Data.shahrs,
//     Many_side_Model: Shahrs,
//     One_Side_Many_field: 'shahrs',
//     Many_side_id_field: 'Shahr_id',
//     Many_side_first_slice_index: 0,
//     Many_side_second_slice_index: 6
// }, {
//     Many_side_data: dehestans_init_Data.dehestans,
//     Many_side_Model: Dehestans,
//     One_Side_Many_field: 'dehestans',
//     Many_side_id_field: 'Dehestan_id',
//     Many_side_first_slice_index: 0,
//     Many_side_second_slice_index: 6
// }]

// dehestan_abadis_and_dehestans_One_side_object = {
//     One_side_data: dehestans_init_Data.dehestans,
//     One_side_Model: Dehestans,
//     Many_Side_One_field: 'dehestan',
//     One_Side_id_field: 'Dehestan_id',
// }
// dehestan_abadis_and_dehestans_Many_side_objects = [{
//     Many_side_data: abadis_init_Data.abadis,
//     Many_side_Model: Abadis,
//     One_Side_Many_field: 'abadis',
//     Many_side_id_field: 'Abadi_id',
//     Many_side_first_slice_index: 0,
//     Many_side_second_slice_index: 10
// }]

// bakhsh_dict = One_to_Many_RelationShip(bakhsh_shahrs_and_dehestans_One_side_object, bakhsh_shahrs_and_dehestans_Many_side_objects)
// dehestan_dict = One_to_Many_RelationShip(dehestan_abadis_and_dehestans_One_side_object, dehestan_abadis_and_dehestans_Many_side_objects)


// Promise.all([
    // Abadis.collection.insertMany(abadis_init_Data.abadis).then((result) => { console.log('Abadi Initialized') }).catch((err) => { console.log('Abadi Exist') }),
    // Dehestans.collection.insertMany(dehestan_dict).then((result) => { console.log('Dehestan Initialized') }).catch((err) => { console.log('Dehestan Exist') }),
    // Shahrs.collection.insertMany(shahrs_init_Data.shahrs).then((result) => { console.log('Shahr Initialized') }).catch((err) => { console.log('Shahr Exist') }),
    // Bakhshs.collection.insertMany(bakhsh_dict).then((result) => { console.log('Bakhsh Initialized') }).catch((err) => { console.log('Bakhsh Exist') }),
    // Shahrestans.collection.insertMany(shahrestan_dict).then((result) => { console.log('Shahrestan Initialized') }).catch((err) => { console.log('Shahrestan Exist') }),
    // Ostans.collection.insertMany(ostan_dict).then((result) => { console.log('Ostan Initialized') }).catch((err) => { console.log('Ostan Exist') }),
// ]).then(() => console.log(' --***-- country division initializing finished --***-- ')).catch((err) => console.log(err))



