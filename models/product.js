const mongoose = require('mongoose')
const db = require('../mongo').connection
const store1db = require('../mongo').store1connection
const store2db = require('../mongo').store2connection
const store3db = require('../mongo').store3connection
const store4db = require('../mongo').store4connection
const store5db = require('../mongo').store5connection


const Schema = mongoose.Schema

const PriceSchema = require('./price').PriceSchema

const ProductSchema = new Schema({
    name: {
        type: String,

        required: true
    },
    description: {
        type: String,
        default: null

    },
    imgLink: {
        type: String,
        default: null

    },
    productLink: {
        type: String,
        default: null

    },
    brand: {
        type: String,

        required: true
    },
    price: {
        type: PriceSchema,
        required: true
    },
    priceTrendPrice: {
        type: PriceSchema,

    },

    priceTrend: [PriceSchema],
    category: {
        type: String,

        default: null
    },
    retailer: {
        type: String,

        required: true
    },
    dietCategories: [String],
    allergyCategories: [String],

    isViewable: {
        type: Boolean,
        required: true,
        default: true
    }


})

var Product = db.model('Product', ProductSchema)
var Product = store1db.model('Product', ProductSchema)
var Product = store2db.model('Product', ProductSchema)
var Product = store3db.model('Product', ProductSchema)
var Product = store4db.model('Product', ProductSchema)
var Product = store5db.model('Product', ProductSchema)





module.exports.ProductSchema = ProductSchema