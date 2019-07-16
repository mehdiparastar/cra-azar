const { mongoose } = require('../db/mongoose');
const path = require('path');
const excelToJson = require('convert-excel-to-json');
const { asyncForEach } = require('../utils/utils')

const CountryDivisionCode = { type: String, required: true, alias: 'CDcode' }
const family_count = { type: Number, required: true, alias: 'family_cnt' }
const population_count = { type: Number, required: true, alias: 'population_cnt' }
const men_count = { type: Number, required: true, alias: 'men_cnt' }
const women_count = { type: Number, required: true, alias: 'women_cnt' }

//////////////////////////////////////////////////////////////////////////////////////
let OstanSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,

    Ostan_id: {
        type: String,
        required: true,
        unique: true,
        alias: 'oid',
        minlength: 2
    },

    Ostan_name: {
        type: String,
        required: true,
        alias: 'oname',
        minlength: 2
    },

    CountryDivisionCode: CountryDivisionCode,

    family_count: family_count,

    population_count: population_count,

    men_count: men_count,

    women_count: women_count
})
let Ostan = mongoose.model('Ostan', OstanSchema)

let ShahrestanSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,

    Shahrestan_id: {
        type: String,
        required: true,
        unique: true,
        alias: 'shid',
        minlength: 2
    },

    Shahrestan_name: {
        type: String,
        required: true,
        alias: 'shname',
        minlength: 2
    },

    CountryDivisionCode: CountryDivisionCode,

    family_count: family_count,

    population_count: population_count,

    men_count: men_count,

    women_count: women_count,

    ref_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Ostan'
    }
})
let Shahrestan = mongoose.model('Shahrestan', ShahrestanSchema)

let BakhshSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,

    Bakhsh_id: {
        type: String,
        required: true,
        unique: true,
        alias: 'bid',
        minlength: 2
    },

    Bakhsh_name: {
        type: String,
        required: true,
        alias: 'bname',
        minlength: 2
    },

    CountryDivisionCode: CountryDivisionCode,

    family_count: family_count,

    population_count: population_count,

    men_count: men_count,

    women_count: women_count,

    ref_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Shahrestan'
    }

})
let Bakhsh = mongoose.model('Bakhsh', BakhshSchema)

let Dehestan_ShahrSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,

    Dehestan_Shahr_id: {
        type: String,
        required: true,
        unique: true,
        alias: 'd_shid',
        minlength: 2
    },

    Dehestan_Shahr_name: {
        type: String,
        required: true,
        alias: 'd_shname',
        minlength: 2
    },

    shahrTop: { type: String },

    SwDiv: { type: String },

    CountryDivisionCode: CountryDivisionCode,

    family_count: family_count,

    population_count: population_count,

    men_count: men_count,

    women_count: women_count,

    ref_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Bakhsh'
    }
})
let Dehestan_Shahr = mongoose.model('Dehestan_Shahr', Dehestan_ShahrSchema)

let AbadiSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,

    Abadi_id: {
        type: String,
        required: true,
        unique: true,
        alias: 'aid',
        minlength: 2
    },

    Abadi_name: {
        type: String,
        required: true,
        alias: 'aname',
        minlength: 2
    },

    CountryDivisionCode: CountryDivisionCode,

    family_count: family_count,

    population_count: population_count,

    men_count: men_count,

    women_count: women_count,

    ref_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Dehestan_Shahr'
    }
})
let Abadi = mongoose.model('Abadi', AbadiSchema)

//////////////////////////////////////////////////////////////////////////////////////
OstanSchema.statics.findOstan = function (Oid) {
    let thisOstan = this
    return thisOstan.findOne({ Ostan_id: Oid }).then((findedOstan) => {
        if (!findedOstan) { Promise.reject() }
        return findedOstan
    })
}

ShahrestanSchema.statics.findShahrestan = function (Oid, Shid) {
    let thisShahrestan = this
    return thisShahrestan.findOne({ Ostan_id: Oid, Shahrestan_id: Shid }).then((findedShahrestan) => {
        if (!findedShahrestan) { Promise.reject() }
        return findedShahrestan
    })
}

BakhshSchema.statics.findBakhsh = function (Oid, Shid, Bid) {
    let thisBakhsh = this
    return thisBakhsh.findOne({ Ostan_id: Oid, Shahrestan_id: Shid, Bakhsh_id: Bid }).then((findedBakhsh) => {
        if (!findedBakhsh) { Promise.reject() }
        return findedBakhsh
    })
}

Dehestan_ShahrSchema.statics.findDehestan_Shahr = function (Oid, Shid, Bid, D_Shid) {
    let thisDehestan_Shahr = this
    return thisDehestan_Shahr.findOne({ Ostan_id: Oid, Shahrestan_id: Shid, Bakhsh_id: Bid, Dehestan_Shahr_id: D_Shid }).then((findedDehestan_Shahr) => {
        if (!findedDehestan_Shahr) { Promise.reject() }
        return findedDehestan_Shahr
    })
}

AbadiSchema.statics.findAbadi = function (Oid, Shid, Bid, D_Shid, A_id) {
    let thisAbadi = this
    return thisAbadi.findOne({ Ostan_id: Oid, Shahrestan_id: Shid, Bakhsh_id: Bid, Dehestan_Shahr_id: D_Shid, Abadi_id: A_id }).then((findedAbadi) => {
        if (!findedAbadi) { Promise.reject() }
        return findedAbadi
    })
}

//////////////////////////////////////////////////////////////////////////////////////
const Ostan_init_Data = excelToJson({
    sourceFile: path.join(__dirname, '../initializing/CountryDivision_Data_to_initializing/Ostan.xlsx'),
    header: { rows: 1 },
    columnToKey: {
        'A': '{{A1}}',
        'B': '{{B1}}',
        'C': '{{C1}}',
        'D': '{{D1}}',
        'E': '{{E1}}',
        'F': '{{F1}}',
        'G': '{{G1}}',
        'H': '{{H1}}'
    }
});

const Shahrestan_init_Data = excelToJson({
    sourceFile: path.join(__dirname, '../initializing/CountryDivision_Data_to_initializing/Shahrestan.xlsx'),
    header: { rows: 1 },
    columnToKey: {
        'A': '{{A1}}',
        'B': '{{B1}}',
        'C': '{{C1}}',
        'D': '{{D1}}',
        'E': '{{E1}}',
        'F': '{{F1}}',
        'G': '{{G1}}',
        'H': '{{H1}}',
    }
});

const Bakhsh_init_Data = excelToJson({
    sourceFile: path.join(__dirname, '../initializing/CountryDivision_Data_to_initializing/Bakhsh.xlsx'),
    header: { rows: 1 },
    columnToKey: {
        'A': '{{A1}}',
        'B': '{{B1}}',
        'C': '{{C1}}',
        'D': '{{D1}}',
        'E': '{{E1}}',
        'F': '{{F1}}',
        'G': '{{G1}}',
        'H': '{{H1}}',
        'I': '{{I1}}',
    }
});

const Dehestan_Shahr_init_Data = excelToJson({
    sourceFile: path.join(__dirname, '../initializing/CountryDivision_Data_to_initializing/Dehestan_Shahr.xlsx'),
    header: { rows: 1 },
    columnToKey: {
        'A': '{{A1}}',
        'B': '{{B1}}',
        'C': '{{C1}}',
        'D': '{{D1}}',
        'E': '{{E1}}',
        'F': '{{F1}}',
        'G': '{{G1}}',
        'H': '{{H1}}',
        'I': '{{I1}}',
        'J': '{{J1}}',
        'K': '{{K1}}',
        'L': '{{L1}}',
    }
});

const Abadi_init_Data = excelToJson({
    sourceFile: path.join(__dirname, '../initializing/CountryDivision_Data_to_initializing/Abadi.xlsx'),
    header: { rows: 1 },
    columnToKey: {
        'A': '{{A1}}',
        'B': '{{B1}}',
        'C': '{{C1}}',
        'D': '{{D1}}',
        'E': '{{E1}}',
        'F': '{{F1}}',
        'G': '{{G1}}',
        'H': '{{H1}}',
        'I': '{{I1}}',
        'J': '{{J1}}',
        'K': '{{K1}}',
    }
});

//////////////////////////////////////////////////////////////////////////////////////
console.log({
    'Ostan_init_Data': Ostan_init_Data.Ostan.length,
    'Shahrestan_init_Data': Shahrestan_init_Data.Shahrestan.length,
    'Bakhsh_init_Data': Bakhsh_init_Data.Bakhsh.length,
    'Dehestan_Shahr_init_Data': Dehestan_Shahr_init_Data.Dehestan_Shahr.length,
    'Abadi_init_Data': Abadi_init_Data.Abadi.length,
})

//////////////////////////////////////////////////////////////////////////////////////
Ostan_init_Data.Ostan.forEach((element) => {
    element._id = mongoose.Types.ObjectId(element._id)
})
Shahrestan_init_Data.Shahrestan.forEach((element) => {
    element._id = mongoose.Types.ObjectId(element._id)
    element.ref_id = mongoose.Types.ObjectId(element.ref_id)
})
Bakhsh_init_Data.Bakhsh.forEach((element) => {
    element._id = mongoose.Types.ObjectId(element._id)
    element.ref_id = mongoose.Types.ObjectId(element.ref_id)
})
Dehestan_Shahr_init_Data.Dehestan_Shahr.forEach((element) => {
    element._id = mongoose.Types.ObjectId(element._id)
    element.ref_id = mongoose.Types.ObjectId(element.ref_id)
})
Abadi_init_Data.Abadi.forEach((element) => {
    element._id = mongoose.Types.ObjectId(element._id)
    element.ref_id = mongoose.Types.ObjectId(element.ref_id)
})

//////////////////////////////////////////////////////////////////////////////////////
Ostan.collection.insertMany(Ostan_init_Data.Ostan).then((result) => { console.log('Ostan Initialized') }).catch((err) => { console.log(err, 'Ostan Exist') })
Shahrestan.collection.insertMany(Shahrestan_init_Data.Shahrestan).then((result) => { console.log('Shahrestan Initialized') }).catch((err) => { console.log(err, 'Shahrestan Exist') })
Bakhsh.collection.insertMany(Bakhsh_init_Data.Bakhsh).then((result) => { console.log('Bakhsh Initialized') }).catch((err) => { console.log(err, 'Bakhsh Exist') })
Dehestan_Shahr.collection.insertMany(Dehestan_Shahr_init_Data.Dehestan_Shahr).then((result) => { console.log('Dehestan_Shahr Initialized') }).catch((err) => { console.log(err, 'Dehestan_Shahr Exist') })
Abadi.collection.insertMany(Abadi_init_Data.Abadi).then((result) => { console.log('Abadi Initialized') }).catch((err) => { console.log(err, 'Abadi Exist') })

module.export = {
    Ostan,
    Shahrestan,
    Bakhsh,
    Dehestan_Shahr,
    Abadi
}



// const Shahrestan_adding_Oid = async () => {
//     let Shahrestan_modified_init_Data = []
//     await asyncForEach(Shahrestan_init_Data.Shahrestan, async (element) => {
//         let ref_o_id = await Ostan.findByOid(element.Ostan_id)
//         Shahrestan_modified_init_Data.push({ ...element, ref_o_id: ref_o_id._id })
//     })
//     return (Shahrestan_modified_init_Data)
// };
// Shahrestan_adding_Oid()