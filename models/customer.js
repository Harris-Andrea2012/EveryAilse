const mongoose = require('mongoose')
const db = require('../mongo').connection
const Schema = mongoose.Schema

const UserSchema = require('./users').UserSchema
const ProductSchema = require('./product').ProductSchema
const ShoppingListSchema = require('./shoppingList').ShoppingListSchema

const CustomerSchema = new Schema({
    user: {
        type: UserSchema,
        required: true
    },
    favorites: [ProductSchema],
    diet: [String],
    allergies: [String],
    shoppingLists: [ShoppingListSchema]



})

const Customer = db.model('Customer', CustomerSchema)
module.exports.CustomerSchema = CustomerSchema