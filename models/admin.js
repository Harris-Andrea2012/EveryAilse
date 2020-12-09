const mongoose = require('mongoose')
const db = require('../mongo').connection
const Schema = mongoose.Schema

const UserSchema = require('./users').UserSchema

const AdminSchema = new Schema({
    user: {
        type: UserSchema,
        required: true
    }

})

const Admin = db.model('Admin', AdminSchema)
module.exports.AdminSchema = AdminSchema