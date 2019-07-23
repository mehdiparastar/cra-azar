const _ = require('lodash')

Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

let asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
///////////////////////////////////////////////ایجاد ارتباط یک به چند و چند به یک بین دو جدول///////////////////////////////////////////////
let One_to_Many_RelationShip = (One_side_object, Many_side_objects) => {
    // Many_side_objects = [{
    //     Many_side_data,
    //     Many_side_Model,
    //     One_Side_Many_field,
    //     Many_side_id_field,
    //     Many_side_first_slice_index,
    //     Many_side_second_slice_index
    // }]
    // One_side_object = {
    //     One_side_data,
    //     One_side_Model,
    //     Many_Side_One_field,
    //     One_Side_id_field,
    // }

    result = []
    Many_list = []
    One_side_object.One_side_data.forEach((One) => {
        new_One = new One_side_object.One_side_Model(One)
        result.push(new_One)

        Many_side_objects.forEach((Many_side_object) => {
            _.find(result, One)[Many_side_object.One_Side_Many_field] = []
            Many_side_object.Many_side_data.forEach((Many) => {
                if (One[One_side_object.One_Side_id_field] === Many[Many_side_object.Many_side_id_field].slice(Many_side_object.Many_side_first_slice_index, Many_side_object.Many_side_second_slice_index)) {
                    new_Many = new Many_side_object.Many_side_Model(Many)
                    _.find(Many_side_object.Many_side_data, Many)[One_side_object.Many_Side_One_field] = new_One._id
                    _.find(result, One)[Many_side_object.One_Side_Many_field].push(new_Many)
                    Many_list.push(new_Many)
                }
            })
        })
    })
    return result, Many_list
}
//                 مثال دستی از تابع بالا
// shahrestans_init_Data.shahrestans.forEach((shahrestan) => {
//     new_Shahrestans = new Shahrestans(shahrestan)
//     shahrestan_dict.push(new_Shahrestans)
//     _.find(shahrestan_dict, shahrestan).bakhshs = []
//     bakhshs_init_Data.bakhshs.forEach((bakhsh) => {
//         if (shahrestan.Shahrestan_id === bakhsh.Bakhsh_id.slice(0, 4)) {
//             new_Bakhshs = new Bakhshs(bakhsh)
//             new_Bakhshs.shahrestan = new_Shahrestans
//             _.find(bakhshs_init_Data.bakhshs, bakhsh)['shahrestan'] = new_Shahrestans._id
//             _.find(shahrestan_dict, shahrestan).bakhshs.push(new_Bakhshs)
//         }
//     })
// })


////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
    asyncForEach,
    One_to_Many_RelationShip
}