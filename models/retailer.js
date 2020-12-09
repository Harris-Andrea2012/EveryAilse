const mongoose = require('mongoose')
const store1db = require('../mongo').store1connection
const store2db = require('../mongo').store2connection
const store3db = require('../mongo').store3connection
const store4db = require('../mongo').store4connection
const store5db = require('../mongo').store5connection
const Schema = mongoose.Schema

const AddressSchema = require('./address').AddressSchema

const RetailerSchema = new Schema({
    dbName: String,
    name: String,
    description: String,
    address: AddressSchema,
    phone: {
        type: Number,
        maxlength: 10,
        minlength: 10
    },
    hqAddress: AddressSchema,
    imgLink: String,
    hasViewableInventory: Boolean

})

var Retailer = store1db.model('Retailer', RetailerSchema)
var Retailer = store2db.model('Retailer', RetailerSchema)
var Retailer = store3db.model('Retailer', RetailerSchema)
var Retailer = store4db.model('Retailer', RetailerSchema)
var Retailer = store5db.model('Retailer', RetailerSchema)
module.exports.RetailerSchema = RetailerSchema