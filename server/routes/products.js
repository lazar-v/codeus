const express = require('express');
const router = express.Router();
const db = require('../db');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const { check, validationResult } = require('express-validator');

// Get all products
router.get('/', (req, res) => {
    Product.findAll()
        .then(products => {
            res.json(products);
        })
        .catch(err => console.log(err));
});

// Get single product by id
router.get('/:id', (req, res) => {
    let { id } = req.params;

    Product.findByPk(id)
        .then(product => {
            res.json(product);
        }, {
            include: [Customer]
        })
        .catch(err => console.log(err));
});

// Create product
router.post('/', [

    check('productName').isLength({ min: 5 }),
    check('quantity').isNumeric({ min: 1 }),

], (req, res) => {

    let { productName, quantity, customerId } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() }).send()
    } else {
        Customer.findByPk(customerId).then((customer) => {
            if(customer) {
                Product.create({
                    productName,
                    quantity
                }).then((product) =>
                    customer.addProduct(product)
                        .then(res.status(200).send())
                );
            }
            else {
                res.status(404).json({ errors: { msg: 'Customer with that id not found.' }}).send();
            }
        })
    }
});

//Update product
router.put('/:id', (req, res) => {
    let { productName, quantity } = req.body;
    let { id } = req.params;

    Product.findByPk(id).then( (product) => {

        productName = productName ? productName : product.productName;
        quantity = quantity ? quantity : product.quantity;

        product.update({
            productName,
            quantity
        }).then(res.status(200).send());
    });

});

// Delete product
router.delete('/:id', (req, res) => {
    let { id } = req.params;

    Product.findByPk(id).then( (product) => {
        product.destroy().then(res.status(204).send());
    });
});

module.exports = router;