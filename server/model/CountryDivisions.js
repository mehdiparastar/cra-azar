const { mongoose } = require('../db/mongoose');

////////////////////////////////اسکیما ها///////////////////////////////////////
const CountryDivisionCode = { type: String, required: true, alias: 'CDcode' }
const family_count = { type: Number, required: true, alias: 'family_cnt' }
const population_count = { type: Number, required: true, alias: 'population_cnt' }
const men_count = { type: Number, required: true, alias: 'men_cnt' }
const women_count = { type: Number, required: true, alias: 'women_cnt' }

let AbadisSchema = new mongoose.Schema({
    Abadi_id: { type: String, required: true, unique: true },
    Abadi_name: { type: String, required: true },
    CountryDivisionCode: CountryDivisionCode,
    family_count: family_count,
    population_count: population_count,
    men_count: men_count,
    women_count: women_count,
    shahr: { type: mongoose.Schema.Types.ObjectId, ref: 'shahrs' }
})

let ShahrsSchema = new mongoose.Schema({
    Shahr_id: { type: String, required: true, unique: true },
    Shahr_name: { type: String, required: true },
    CountryDivisionCode: CountryDivisionCode,
    family_count: family_count,
    population_count: population_count,
    men_count: men_count,
    women_count: women_count,
    abadis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'abadis' }],
    bakhsh: { type: mongoose.Schema.Types.ObjectId, ref: 'bakhshs' }
})

let BakhshsSchema = new mongoose.Schema({
    Bakhsh_id: { type: String, required: true, unique: true },
    Bakhsh_name: { type: String, required: true },
    CountryDivisionCode: CountryDivisionCode,
    family_count: family_count,
    population_count: population_count,
    men_count: men_count,
    women_count: women_count,
    shahrs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'shahrs' }],
    shahrestan: { type: mongoose.Schema.Types.ObjectId, ref: 'shahrestans' }
})

let ShahrestansSchema = new mongoose.Schema({
    Shahrestan_id: { type: String, required: true, unique: true },
    Shahrestan_name: { type: String, required: true },
    CountryDivisionCode: CountryDivisionCode,
    family_count: family_count,
    population_count: population_count,
    men_count: men_count,
    women_count: women_count,
    bakhshs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bakhshs' }],
    ostan: { type: mongoose.Schema.Types.ObjectId, ref: 'ostan' }
})

let OstansSchema = new mongoose.Schema({
    Ostan_id: { type: String, required: true, unique: true },
    Ostan_name: { type: String, required: true },
    CountryDivisionCode: CountryDivisionCode,
    family_count: family_count,
    population_count: population_count,
    men_count: men_count,
    women_count: women_count,
    shahrestans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'shahrestans' }]
})

let Abadis = mongoose.model('abadis', AbadisSchema)
let Shahrs = mongoose.model('shahrs', ShahrsSchema)
let Bakhshs = mongoose.model('bakhshs', BakhshsSchema)
let Shahrestans = mongoose.model('shahrestans', ShahrestansSchema)
let Ostans = mongoose.model('ostans', OstansSchema)


module.exports = {
    Ostans,
    Shahrestans,
    Bakhshs,
    Shahrs,
    Abadis
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

//////////////////////////////////////////////////////////////////////////////////////
// OstanSchema.statics.findOstan = function (Oid) {
//     let thisOstan = this
//     return thisOstan.findOne({ Ostan_id: Oid }).then((findedOstan) => {
//         if (!findedOstan) { Promise.reject() }
//         return findedOstan
//     })
// }

// ShahrestanSchema.statics.findShahrestan = function (Oid, Shid) {
//     let thisShahrestan = this
//     return thisShahrestan.findOne({ Ostan_id: Oid, Shahrestan_id: Shid }).then((findedShahrestan) => {
//         if (!findedShahrestan) { Promise.reject() }
//         return findedShahrestan
//     })
// }

// BakhshSchema.statics.findBakhsh = function (Oid, Shid, Bid) {
//     let thisBakhsh = this
//     return thisBakhsh.findOne({ Ostan_id: Oid, Shahrestan_id: Shid, Bakhsh_id: Bid }).then((findedBakhsh) => {
//         if (!findedBakhsh) { Promise.reject() }
//         return findedBakhsh
//     })
// }

// Dehestan_ShahrSchema.statics.findDehestan_Shahr = function (Oid, Shid, Bid, D_Shid) {
//     let thisDehestan_Shahr = this
//     return thisDehestan_Shahr.findOne({ Ostan_id: Oid, Shahrestan_id: Shid, Bakhsh_id: Bid, Dehestan_Shahr_id: D_Shid }).then((findedDehestan_Shahr) => {
//         if (!findedDehestan_Shahr) { Promise.reject() }
//         return findedDehestan_Shahr
//     })
// }

// AbadiSchema.statics.findAbadi = function (Oid, Shid, Bid, D_Shid, A_id) {
//     let thisAbadi = this
//     return thisAbadi.findOne({ Ostan_id: Oid, Shahrestan_id: Shid, Bakhsh_id: Bid, Dehestan_Shahr_id: D_Shid, Abadi_id: A_id }).then((findedAbadi) => {
//         if (!findedAbadi) { Promise.reject() }
//         return findedAbadi
//     })
// }


//////////////////////////////////////////////////////////////////////////////////////
// Ostan_init_Data.Ostan.forEach((element) => {
//     element._id = mongoose.Types.ObjectId(element._id)
// })
// Shahrestan_init_Data.Shahrestan.forEach((element) => {
//     element._id = mongoose.Types.ObjectId(element._id)
//     element.ref_id = mongoose.Types.ObjectId(element.ref_id)
// })
// Bakhsh_init_Data.Bakhsh.forEach((element) => {
//     element._id = mongoose.Types.ObjectId(element._id)
//     element.ref_id = mongoose.Types.ObjectId(element.ref_id)
// })
// Dehestan_Shahr_init_Data.Dehestan_Shahr.forEach((element) => {
//     element._id = mongoose.Types.ObjectId(element._id)
//     element.ref_id = mongoose.Types.ObjectId(element.ref_id)
// })
// Abadi_init_Data.Abadi.forEach((element) => {
//     element._id = mongoose.Types.ObjectId(element._id)
//     element.ref_id = mongoose.Types.ObjectId(element.ref_id)
// })

//////////////////////////////////////////////////////////////////////////////////////

// Abadi.findOne({ Abadi_id: '0302020001026702' }).populate('ref_id').then((abadi) => { console.log(abadi) })