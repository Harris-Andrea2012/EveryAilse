const mongoose = require('mongoose')
const db = require('../mongo').connection
const store1db = require('../mongo').store1connection
const store2db = require('../mongo').store2connection
const store3db = require('../mongo').store3connection
const store4db = require('../mongo').store4connection
const store5db = require('../mongo').store5connection

const Schema = mongoose.Schema

const PriceSchema = new Schema({
    value: {
        type: Number,
        required: true
    },
    asOfDate: {
        type: Schema.Types.Date,
        required: true

    }
})

var Price = db.model('Price', PriceSchema)
var Price = store1db.model('Price', PriceSchema)
var Price = store2db.model('Price', PriceSchema)
var Price = store3db.model('Price', PriceSchema)
var Price = store4db.model('Price', PriceSchema)
var Price = store5db.model('Price', PriceSchema)




module.exports.PriceSchema = PriceSchema