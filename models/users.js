const mongoose = require('mongoose')

const db = require('../mongo').connection

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    email: String,
    hash: String,
    salt: String,
    userType: String



})

const User = db.model('User', UserSchema)

module.exports.UserSchema = UserSchema