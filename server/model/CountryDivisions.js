const { mongoose } = require('../db/mongoose');

const CountryDivisionCode = {
    type: String,
    required: true,
    alias: 'CDcode'
}

const family_count = {
    type: Number,
    required: true,
    alias: 'family_cnt'
}

const population_count = {
    type: Number,
    required: true,
    alias: 'population_cnt'
}

const men_count = {
    type: Number,
    required: true,
    alias: 'men_cnt'
}

const women_count = {
    type: Number,
    required: true,
    alias: 'women_cnt'
}

let OstanSchema = new mongoose.Schema({
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

let ShahrestanSchema = new mongoose.Schema({
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

    women_count: women_count
})

let BakhshSchema = new mongoose.Schema({
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

    women_count: women_count
})

let Dehestan_ShahrSchema = new mongoose.Schema({
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

    women_count: women_count
})

let AbadiSchema = new mongoose.Schema({
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

    women_count: women_count
})

let Ostan = mongoose.model('Ostan', OstanSchema)
let Shahrestan = mongoose.model('Shahrestan', ShahrestanSchema)
let Bakhsh = mongoose.model('Bakhsh', BakhshSchema)
let Dehestan_Shahr = mongoose.model('Dehestan_Shahr', Dehestan_ShahrSchema)
let Abadi = mongoose.model('Abadi', AbadiSchema)

module.export = {
    Ostan,
    Shahrestan,
    Bakhsh,
    Dehestan_Shahr,
    Abadi
}
