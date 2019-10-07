const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const { check, validationResult } = require('express-validator');

/**
 * Gets all products
 */
router.get('/', (req, res) => {
    Product.findAll()
        .then(products => {
            res.json(products);
        })
        .catch(err => console.log(err));
});

/**
 * Gets a single product by id
 * @param  id
 */
router.get('/:id', (req, res) => {
    let { id } = req.params;

    Product.findByPk(id, {
        include: [{
            model: Customer,
            as: 'customer'
        }]
    }).then((product) => {
        product ? res.json(product) : res.status(404).send();
    });
});



/**
 * Creates a product with parameters from within the body of the html request.
 */
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
                    quantity,
                    customer
                }).then((product) => {
                    product.setCustomer(customer);
                    customer.addProduct(product)
                        .then(res.status(200).send());
                    }
                );
            }
            else {
                res.status(404).json({ errors: { msg: 'Customer with that id not found.' }}).send();
            }
        })
    }
});

/**
 * Updates a single product's parameters with new values from within the html request body.
 * @param  id
 */
router.put('/:id', (req, res) => {
    let { productName, quantity } = req.body;
    let { id } = req.params;

    Product.findByPk(id).then( (product) => {
        if (product) {
            productName = productName ? productName : product.productName;
            quantity = quantity ? quantity : product.quantity;

            product.update({
                productName,
                quantity
            }).then(res.status(200).send());
        }
        else
            res.status(404).json({ errors: { msg: 'Product with that id not found.' } }).send();
    });

});

/**
 * Deletes a product by id.
 * @param  id
 */
router.delete('/:id', (req, res) => {
    let { id } = req.params;

    Product.findByPk(id).then( (product) => {
        if(product)
            product.destroy().then(res.status(204).send());
        else
            res.status(404).json({ errors: { msg: 'Product with that id not found.' } }).send();
    });
});

module.exports = router;