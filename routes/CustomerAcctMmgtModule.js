const express = require('express')
const router = express.Router()
const db = require('../mongo').connection
const bodyParser = require('body-parser')
const { query } = require('express')
router.use(bodyParser.json())

const createPassword = require('../Utility').createPassword

const User = db.models.User
const Admin = db.models.Admin
const Customer = db.models.Customer
const Product = db.models.Product

router.post('/updateAcct', (req, res) => {
    const query = { email: req.body.email }

    var userPassword = undefined
    if (req.body.passwordUpdate != null) {
        console.log('Value for PASSWORD UPDATE' + req.body.passwordUpdate)
        userPassword = createPassword(req.body.passwordUpdate)

    }


    User.findOne(query).exec().then(result => {
        if (result.userType == 'admin') {
            Admin.findOne({ "user.email": result.email }).exec().then(admin => {

                admin.user.email = req.body.emailUpdate
                admin.user.name = req.body.nameUpdate
                if (userPassword != undefined) {
                    admin.user.hash = userPassword.hash
                    admin.user.salt = userPassword.salt

                }

                admin.save()
            }).catch(adminError => {
                console.log(adminError)
                res.status(404).send()
            })

        } else {
            Customer.findOne({ "user.email": result.email }).exec().then(customer => {

                customer.user.email = req.body.emailUpdate
                customer.user.name = req.body.nameUpdate

                if (userPassword != undefined) {
                    customer.user.hash = userPassword.hash
                    customer.user.salt = userPassword.salt

                }

                customer.save()
            }).catch(customerError => {
                console.log(customerError)
                res.status(404).send()
            })

        }
        result.email = req.body.emailUpdate
        result.name = req.body.nameUpdate
        if (userPassword != undefined) {
            result.hash = userPassword.hash
            result.salt = userPassword.salt

        }

        result.save()

        res.status(200).send(JSON.stringify(result))

    }).catch(
        error => {
            console.log(error)
            res.status(404).send()
        }

    )




})

router.post('/dietPreferences', (req, res) => {
    const query = { "user.email": req.body.email }

    var preferences = []
    if (req.body.Paleo == 'true') {
        preferences.push('Paleo')
    }
    if (req.body.Vegan == 'true') {
        preferences.push('Vegan')
    }
    if (req.body.Vegetarian == 'true') {
        preferences.push('Vegetarian')
    }
    if (req.body.Keto == 'true') {
        preferences.push('Keto')
    }

    console.log(preferences)



    Customer.findOne(query).exec().then(result => {
        console.log(result)
        result.diet = preferences
        result.save()
        res.status(200).send()



    }).catch(error => {
            console.log(error)
            res.status(400).send()
        }

    )


})

router.post('/allergies', (req, res) => {
    const query = { "user.email": req.body.email }

    var allergies = []

    if (req.body.Dairy == 'true') {
        allergies.push('Dairy')
    }
    if (req.body.Peanuts == 'true') {
        allergies.push('Peanuts')
    }
    if (req.body.Treenuts == 'true') {
        allergies.push('Treenuts')
    }
    if (req.body.Soy == 'true') {
        allergies.push('Soy')
    }
    if (req.body.Fish == 'true') {
        allergies.push('Fish')
    }
    if (req.body.Gluten == 'true') {
        allergies.push('Gluten')
    }

    Customer.findOne(query).exec().then(result => {

        result.allergies = allergies
        result.save()
        res.status(200).send()

    }).catch(error => {
        console.log(error)
        res.status(400).send()

    })

})

router.post('/addToFavorites', (req, res) => {


    const query = { "user.email": req.body.email }
    Customer.findOne(query).exec().then((result) => {
        const product = req.body.product
        const favorites = result.favorites


        var inFaves = false
        favorites.forEach((favoriteProduct) => {
            if (favoriteProduct.name === product.name) { inFaves = true }

        })

        console.log('PRODUCT IN FAVE: ' + inFaves)

        if (!inFaves) {

            const newFave = new Product({
                name: product.name,
                description: product.description,
                imgLink: product.imgLink,
                brand: product.brand,
                price: product.price,
                priceTrend: product.priceTrend,
                category: product.category,
                retailer: product.retailer,
                dietCategories: product.dietCategories,
                allergyCategories: product.allergyCategories,
                isViewable: product.isViewable


            })
            console.log('added to favorites')
            result.favorites.push(newFave)
            result.save()

            res.status(200).send()

        } else {
            res.status(404).send()
        }


    }).catch((err) => {
        console.log(err)
        res.status(400).send()
    })

})

router.post('/getFavorites', (req, res) => {
    var query = { "user.email": req.body.email }
    Customer.findOne(query).exec().then(result => {
            var favorites = result.favorites
            console.log('retrieved favorites count\n\n' + favorites.length)

            res.status(200).send(JSON.stringify(favorites))
        }

    ).catch(err => {
        console.log(err)
        res.status(400).send()

    })
})

router.post('/removeFavorite', (req, res) => {
    query1 = { "user.email": req.body.email }
    query2 = { name: req.body.product.name }

    Customer.updateOne(query1, { "$pull": { "favorites": query2 } }, { safe: true, multi: true }, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send()
        }

        res.status(200).send()


    })

})

router.post('/deleteShoppingList', (req, res) => {

    query1 = { "user.email": req.body.email }
    query2 = { listTitle: req.body.shoppingList.listTitle }

    Customer.updateOne(query1, { "$pull": { "shoppingLists": query2 } }, { safe: true, multi: true }, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send()
        }

        res.status(200).send()


    })

})

module.exports = router