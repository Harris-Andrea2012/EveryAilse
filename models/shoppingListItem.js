const mongoose = require('mongoose')
const db = require('../mongo').connection

const Schema = mongoose.Schema

const PriceSchema = require('./price').PriceSchema

const ShoppingListItemSchema = new Schema({

    productName: {
        type: String,
        required: true
    },
    price: {
        type: PriceSchema,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    productLink: {
        type: String,
        default: null

    },
    retailerName: {
        type: String,
        required: true
    },
    imgLink: String

})

var ShoppingListItem = db.model('ShoppingListItem', ShoppingListItemSchema)



module.exports.ShoppingListItemSchema = ShoppingListItemSchema