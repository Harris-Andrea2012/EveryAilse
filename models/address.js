const mongoose = require('mongoose')

//Databases
const db = require('../mongo').connection
const store1db = require('../mongo').store1connection
const store2db = require('../mongo').store2connection
const store3db = require('../mongo').store3connection
const store4db = require('../mongo').store4connection
const store5db = require('../mongo').store5connection
const Schema = mongoose.Schema

const AddressSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,

        default: "Undisclosed"
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        minlength: 2,
        maxlength: 2,
        required: true
    },
    zip: {
        type: String,
        minlength: 5,
        required: true

    }



})

var Address = db.model('Address', AddressSchema)
var Address = store1db.model('Address', AddressSchema)
var Address = store2db.model('Address', AddressSchema)
var Address = store3db.model('Address', AddressSchema)
var Address = store4db.model('Address', AddressSchema)
var Address = store5db.model('Address', AddressSchema)


module.exports.AddressSchema = AddressSchema