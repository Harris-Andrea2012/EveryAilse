const express = require('express')
const router = express.Router()
const db = require('../mongo').connection
const bodyParser = require('body-parser')

const validLogin = require('../Utility').validPassword
const createPassword = require('../Utility').createPassword


router.use(bodyParser.json())


const User = db.models.User
const Customer = db.models.Customer
const Admin = db.models.Admin

router.post('/addAdmin', (req, res) => {
    const query = { email: req.body.email }
    const adminPassword = createPassword(req.body.password)

    User.findOne(query, (err, result) => {
        if (result == null) {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                hash: adminPassword.hash,
                salt: adminPassword.salt,
                userType: 'admin'


            })


            console.log(newUser)
            newUser.save()

            const newAdmin = new Admin({
                user: newUser


            })

            newAdmin.save()

            res.status(200).send()



        } else {
            res.status(400).send()
        }

    })

})


router.post('/signUp', (req, res) => {

    const query = { email: req.body.email }

    const userPassword = createPassword(req.body.password)




    User.findOne(query, (err, result) => {
        if (result == null) {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                hash: userPassword.hash,
                salt: userPassword.salt,
                userType: 'customer'


            })


            console.log(newUser)
            newUser.save()

            const newCustomer = new Customer({
                user: newUser


            })
            newCustomer.save()


            res.status(200).send()


        } else {
            res.status(400).send()
        }
    })









})

router.post('/login', (req, res) => {

    console.log(req.body.email)
    const query = { email: req.body.email }

    User.findOne(query, (err, result) => {
        if (result != null) {


            const isValid = validLogin(req.body.password, result.salt, result.hash)
            if (isValid) {
                console.log('is valid')
                const user = result


                res.status(200).send(JSON.stringify(user))
            } else {
                console.log('wrong password')
                res.status(400).send()
            }
        } else {
            console.log('user NOT found')
            res.status(404).send()
        }

    })
})

router.post('/getCustomers', async(req, res) => {
    try {

        var customers = await User.find({ userType: "customer" }).lean();
        res.status(200).send(JSON.stringify(customers))
    } catch (error) {
        console.log(error)
        res.status(400).send(error)

    }


})

router.post('/removeCustomer', async(req, res) => {
    const query1 = { email: req.body.email }
    const query2 = { "user.email": req.body.email }
    await User.deleteOne(query1).exec().then(result => {
        console.log('User Account Removed!')


    }).catch(err => {
        console.log(err)
        res.status(404).send(err)

    })
    await Customer.deleteOne(query2).exec().then(result => {
        console.log('Customer Account Removed!')
        res.status(200).send()

    }).catch(err => {
        console.log(err)
        res.status(404).send(err)

    })
    res.status(200).send()

})
module.exports = router