const mongoose = require('mongoose')
const db = require('../mongo').connection
const Schema = mongoose.Schema


const ShoppingListItemSchema = require('./shoppingListItem').ShoppingListItemSchema
const RetailerSchema = require('./retailer').RetailerSchema

const ShoppingListSchema = new Schema({
    listTitle: {
        type: String,
        required: true
    },

    listDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    shoppingListItems: [ShoppingListItemSchema],

    subTotal: {
        type: Number,
        required: true
    },
    retailers: [RetailerSchema]



})

const ShoppingList = db.model('ShoppingList', ShoppingListSchema)

module.exports.ShoppingListSchema = ShoppingListSchema