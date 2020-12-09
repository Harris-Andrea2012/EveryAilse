require('dotenv').config()

const mongoose = require('mongoose')
    //you need to create 3 seperate dbs, seperate retailer related modules from customer mmgt


const conn = process.env.DB_URL
const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})

connection.on('error', console.error.bind(console, 'connection error:'))
connection.on('connected', function() { console.log('MAIN DB connected') })
connection.on('disconnecting', function() { console.log('MAIN DB disconnected') })




module.exports.connection = connection

//Store1

const store1conn = process.env.STORE1_DB_URL
const store1connection = mongoose.createConnection(store1conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})

store1connection.on('error', console.error.bind(console, 'connection error:'))
store1connection.on('connected', function() { console.log('STORE1DB connected') })
store1connection.on('disconnecting', function() { console.log('STORE1DB disconnected') })


module.exports.store1connection = store1connection

//Store2


const store2conn = process.env.STORE2_DB_URL
const store2connection = mongoose.createConnection(store2conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})

store2connection.on('error', console.error.bind(console, 'connection error:'))
store2connection.on('connected', function() { console.log('STORE2DB connected') })
store2connection.on('disconnecting', function() { console.log('STORE2DB disconnected') })

module.exports.store2connection = store2connection

//Store3

const store3conn = process.env.STORE3_DB_URL
const store3connection = mongoose.createConnection(store3conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})

store3connection.on('error', console.error.bind(console, 'connection error:'))
store3connection.on('connected', function() { console.log('STORE3DB connected') })
store3connection.on('disconnecting', function() { console.log('STORE3DB disconnected') })

module.exports.store3connection = store3connection

//Store4

const store4conn = process.env.STORE4_DB_URL
const store4connection = mongoose.createConnection(store4conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})

store4connection.on('error', console.error.bind(console, 'connection error:'))
store4connection.on('connected', function() { console.log('STORE4DB connected') })
store4connection.on('disconnecting', function() { console.log('STORE4DB disconnected') })

module.exports.store4connection = store4connection

//Store3

const store5conn = process.env.STORE5_DB_URL
const store5connection = mongoose.createConnection(store5conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})

store5connection.on('error', console.error.bind(console, 'connection error:'))
store5connection.on('connected', function() { console.log('STORE5DB connected') })
store5connection.on('disconnecting', function() { console.log('STORE5DB disconnected') })

module.exports.store5connection = store5connection