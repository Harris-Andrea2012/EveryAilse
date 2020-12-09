const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')

const EveryAilse = require('./mongo').connection
const EveryStore1 = require('./mongo').store1connection
const EveryStore2 = require('./mongo').store2connection
const EveryStore3 = require('./mongo').store3connection
const EveryStore4 = require('./mongo').store4connection
const EveryStore5 = require('./mongo').store5connection

const connections = [EveryAilse, EveryStore1, EveryStore2, EveryStore3, EveryStore4, EveryStore5]




//app.use(express.static('./public'))
app.use(express.static(path.join(__dirname, "/public")))
app.set('view engine', 'ejs')





const fs = require('fs')

fs.readdirSync(__dirname + '/models').forEach((filename) => {
    if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)

})



fs.readdirSync(__dirname + '/routes').forEach((filename) => {
    if (~filename.indexOf('.js')) app.use(require(__dirname + '/routes/' + filename))

})

app.listen(port, console.log(`Listening on port ${port}`))

process.on('SIGINT', () => {
    console.log('stuff')
    async function closeConnections() {
        for (var i = 0; i < connections.length; i++) {
            await connections[i].close()


        }

        process.exit(0)

    }

    closeConnections()




});