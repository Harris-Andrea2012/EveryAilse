require('dotenv').config()
const express = require('express')
const router = express.Router()

const ejs = require('ejs')
const fs = require('fs')
const nodemailer = require('nodemailer')
const nodeMailTransport = require('nodemailer-mailgun-transport')
const bodyParser = require('body-parser')


const domain = process.env.MAILGUN_DOMAIN
const key = process.env.MAILGUN_API_KEY
const email = process.env.MAILGUN_RECEIVER

const store1db = require('../mongo').store1connection
const store2db = require('../mongo').store2connection
const store3db = require('../mongo').store3connection
const store4db = require('../mongo').store4connection
const store5db = require('../mongo').store5connection
const db = require('../mongo').connection

//User
const Customer = db.models.Customer
const Product = db.models.Product
const ShoppingList = db.models.ShoppingList

//Store Connections
const store1Retailer = store1db.models.Retailer
const store1Product = store1db.models.Product

const store2Retailer = store2db.models.Retailer
const store2Product = store2db.models.Product

const store3Retailer = store3db.models.Retailer
const store3Product = store3db.models.Product

const store4Retailer = store4db.models.Retailer
const store4Product = store4db.models.Product

const store5Retailer = store5db.models.Retailer
const store5Product = store5db.models.Product

const retailModels = [store1Retailer, store2Retailer, store3Retailer, store4Retailer, store5Retailer]
const productModels = [store1Product, store2Product, store3Product, store4Product, store5Product]



router.use(express.static('./public'))

router.use(bodyParser.json())





router.post('/addRetailer', (req, res) => {
    const dbNum = req.body.dbNum
    const retailer = req.body.retailer
    var RetailerModel = undefined
    switch (dbNum) {
        case 1:
            RetailerModel = store1Retailer

            break;
        case 2:
            RetailerModel = store2Retailer
            break;
        case 3:
            RetailerModel = store3Retailer
            break;
        case 4:
            RetailerModel = store4Retailer
            break;
        case 5:
            RetailerModel = store5Retailer
            break;
        default:
            res.status(200).send('No database selected')


    }


    try {

        const newRetailer = new RetailerModel({
            name: retailer.name,
            dbName: retailer.dbName,
            description: retailer.description,
            address: {
                name: retailer.address.name,
                streetAddress: retailer.address.streetAddress,
                city: retailer.address.city,
                state: retailer.address.state,
                zip: retailer.address.zip
            },
            phone: 1234567890,
            hqAddress: {
                name: retailer.hqAddress.name,
                streetAddress: retailer.hqAddress.streetAddress,
                city: retailer.hqAddress.city,
                state: retailer.hqAddress.state,
                zip: retailer.hqAddress.zip
            },
            imgLink: retailer.imgLink,
            hasViewableInventory: true


        })
        console.log(newRetailer)
        newRetailer.save()
        res.status(200).send(RetailerModel.db.name + ' new Retailer Created')




    } catch (error) {
        console.log(error)
        res.status(400).send(error)

    }




})


router.post('/switchRetailerViewable', async(req, res) => {
    const toRemove = req.body.Retailer
    var visbilityChange = undefined
    if (toRemove.hasViewableInventory) {
        visbilityChange = false
    } else {
        visbilityChange = true
    }


    switch (toRemove.dbName) {
        case "EveryStoreOne":
            await store1Retailer.updateOne({}, { hasViewableInventory: visbilityChange },
                (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send()
                    }
                    console.log('visbilityChange changed successfully!')
                    res.status(200).send()

                })

            break;
        case "EveryStoreTwo":
            await store2Retailer.updateOne({}, { hasViewableInventory: visbilityChange },
                (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send()
                    }
                    console.log('visbilityChange changed successfully!')
                    res.status(200).send()

                })


            break;
        case "EveryStoreThree":
            await store3Retailer.updateOne({}, { hasViewableInventory: visbilityChange },
                (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send()
                    }
                    console.log('visbilityChange changed successfully!')
                    res.status(200).send()

                })

            break;
        case "EveryStoreFour":
            await store4Retailer.updateOne({}, { hasViewableInventory: visbilityChange },
                (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send()
                    }
                    console.log('visbilityChange changed successfully!')
                    res.status(200).send()

                })


            break;
        case "EveryStoreFive":
            await store5Retailer.updateOne({}, { hasViewableInventory: visbilityChange },
                (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send()
                    }
                    console.log('visbilityChange changed successfully!')
                    res.status(200).send()

                })



            break;

    }



})

function shuffleArray(array) {
    var currentIndex = array.length,
        tempIndex, randomIndex

    while (currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex--)
        array[tempIndex] = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = array[tempIndex]

    }


    return array

}





router.post('/addProducts', (req, res) => {
    const retailerNum = req.body.retailerNum
    const filePath = req.body.filePath
    var data = fs.readFileSync(filePath, 'utf8')
    const name = req.body.name
    const category = req.body.category


    try {
        data = JSON.parse(data)
        console.log(data.length)



    } catch (error) {
        console.log(error)
        res.status(400).send()

    }
    var RetailerProduct = {}

    switch (retailerNum) {
        case 1:
            RetailerProduct = store1Product;
            break;
        case 2:
            RetailerProduct = store2Product;
            break;
        case 3:
            RetailerProduct = store3Product;
            break;
        case 4:
            RetailerProduct = store4Product;
            break;
        case 5:
            RetailerProduct = store5Product;
            break;

    }

    data.forEach(product => {


        const newProduct = new RetailerProduct({
            name: product.name,
            description: product.description,
            imgLink: product.imgLink,
            brand: product.brand,
            price: { value: product.price, asOfDate: new Date() },
            priceTrendPrice: { value: product.price, asOfDate: new Date() },
            priceTrend: [
                { value: product.price, asOfDate: new Date() }
            ],
            category: category,
            retailer: name,
            dietCategories: [],
            allergyCategories: product.allergyCategories,
            isViewable: true,
            productLink: product.productLink

        })

        newProduct.save().catch(err => {
            console.log(err)
        })



    });

    res.status(200).send()








})

router.post('/getRetailers', async(req, res) => {
    var retailers = []

    for (i = 0; i < retailModels.length; i++) {
        await retailModels[i].findOne().lean().exec().then(result => {
            console.log(result.hasViewableInventory)
            if (result.hasViewableInventory) {
                retailers.push(result)

            }

        })

    }
    console.log('RETAILERS SIZE' + retailers.length)


    res.status(200).send(JSON.stringify(retailers))





})

router.post('/getAllRetailers', async(req, res) => {
    var retailers = []

    for (i = 0; i < retailModels.length; i++) {
        await retailModels[i].findOne().lean().exec().then(result => {
            retailers.push(result)

        })

    }
    console.log('RETAILERS SIZE' + retailers.length)


    res.status(200).send(JSON.stringify(retailers))


})

router.post('/getAllProducts', async(req, res) => {
    var products = []
    try {
        for (var i = 0; i < productModels.length; i++) {
            console.log(productModels[i].db.name)
            const cursor = productModels[i].find().lean().cursor();

            for (let product = await cursor.next(); product != null; product = await cursor.next()) {
                products.push(product)
            }

            console.log('PRODUCT ARRAY LENGTH AFTER DB:' + productModels[i].db.name + ' ' + products.length)
        }
    } catch (error) {
        error => {
            console.log(error)
            res.status(400).send()
        }

    }
    res.status(200).send(JSON.stringify(shuffleArray(products)))



})

router.post('/getProducts', async(req, res) => {

    const retailerList = req.body.Retailers
    var productDbs = []
    var products = []




    retailerList.forEach(received => {
        switch (received.dbName) {
            case "EveryStoreOne":
                productDbs.push(store1Product)
                break;
            case "EveryStoreTwo":
                productDbs.push(store2Product)
                break;
            case "EveryStoreThree":
                productDbs.push(store3Product)
                break;
            case "EveryStoreFour":
                productDbs.push(store4Product)
                break;
            case "EveryStoreFive":
                productDbs.push(store5Product)
                break;

        }

    })





    for (var i = 0; i < productDbs.length; i++) {
        const cursor = productDbs[i].find().lean().cursor();

        for (let product = await cursor.next(); product != null; product = await cursor.next()) {
            if (product.isViewable) {
                products.push(product)

            }

        }

        console.log('PRODUCT ARRAY LENGTH: ' + products.length)
    }



    res.status(200).send(JSON.stringify(shuffleArray(products)))




})

router.post('/storeShoppingList', (req, res) => {
    const query = { "user.email": req.body.email }
    const shoppingList = req.body.shoppingList

    Customer.findOne(query).exec().then(result => {
        try {
            const newShoppingList = new ShoppingList({
                listTitle: shoppingList.listTitle,

                listDate: shoppingList.listDate,
                shoppingListItems: shoppingList.shoppingListItems,

                subTotal: shoppingList.subTotal,
                retailers: shoppingList.retailers
            })

            result.shoppingLists.push(newShoppingList)
            result.save()
            res.status(200).send()

        } catch (error) {

            console.log(error)
            res.status(400).send(JSON.stringify(error))
        }



    }).catch(err => {
        console.log(err)
        res.status(400).send(JSON.stringify(error))
    })




})

router.post('/getShoppingLists', (req, res) => {
    const query = { "user.email": req.body.email }

    Customer.findOne(query).exec().then(result => {
        var shoppingLists = result.shoppingLists
        res.status(200).send(JSON.stringify(shoppingLists))



    }).catch(error => {
        console.log(error)
        res.status(400).send(JSON.stringify(error))
    })

})




router.post('/sendEmail', (req, res) => {
    var shoppingList = req.body.RetailerObjects
    var title = req.body.title


    async function sendShoppingList() {

        const auth = {
            auth: {
                api_key: key,
                domain: domain
            }
        }

        let transporter = nodemailer.createTransport(nodeMailTransport(auth))

        const data = await ejs.renderFile('./views/email.ejs', { title: title, shoppingList: shoppingList })

        const mailOptions = {
            from: 'EveryAisle <CustomerService@EveryAisle.com>',
            to: email,
            subject: `Here's your Shopping List!`,
            html: data,

            attachments: [{
                filename: 'pdf_header.png',
                path: `/public/pdf_header.png`,
                cid: 'logoHeader'
            }]
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                res.status(400).send()
            } else {
                console.log('Sent the EMAIL!!!!!!!!!')
                res.status(200).send()
            }

        })


    }

    sendShoppingList()


})




router.post('/changeProductVisibility', async(req, res) => {
    const products = req.body.Products
    console.log(products)


    for (var i = 0; i < products.length; i++) {
        var visibilityChange = undefined
        if (products[i].isViewable) {
            visibilityChange = false
        } else {
            visibilityChange = true
        }

        switch (products[i].dbName) {

            case "EveryStoreOne":
                await store1Product.updateMany({ name: products[i].name }, { isViewable: visibilityChange }, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send()
                    }
                    console.log('visbilityChange changed successfully!')



                })
                break;
            case "EveryStoreTwo":
                await store2Product.updateMany({ name: products[i].name }, { isViewable: visibilityChange }, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send()
                    }
                    console.log('visbilityChange changed successfully!')



                })
                break;
            case "EveryStoreThree":
                await store3Product.updateMany({ name: products[i].name }, { isViewable: visibilityChange }, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send()
                    }
                    console.log('visbilityChange changed successfully!')



                })
                break;
            case "EveryStoreFour":
                await store4Product.updateMany({ name: products[i].name }, { isViewable: visibilityChange }, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send()
                    }
                    console.log('visbilityChange changed successfully!')


                })
                break;
            case "EveryStoreFive":
                await store5Product.updateMany({ name: products[i].name }, { isViewable: visibilityChange }, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send()
                    }
                    console.log('visbilityChange changed successfully!')



                })
                break;

        }


    }

    res.status(200).send()


})



module.exports = router