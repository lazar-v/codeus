const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const { check, validationResult } = require('express-validator');

// Get All Customers
router.get('/', (req, res) => {
    Customer.findAll().then((customers) => {
        res.json(customers);
    });
});

// Get Single Customer by id
router.get('/:id', (req, res) => {
    let { id } = req.params;

    Customer.findByPk(id, {
        include: [{
            model: Product,
            as: 'Product'
        }]
    }).then((customer) => {
        customer ? res.json(customer) : res.status(404).send();
    });
});

// Create Customer
router.post('/', [

    check('fname').isLength({ min: 5 }),
    check('lname').isLength({ min: 5 }),
    check('email').isEmail()

], (req, res) => {
    let { fname, lname, email } = req.body;

    const errors = validationResult(req);
    !errors.isEmpty() ?
        res.status(422).json({ errors: errors.array() }).send() :
        Customer.create({
            fname,
            lname,
            email
        }).then(res.status(200).send());
});

// Update Customer
router.put('/:id', (req, res) => {
    let { fname, lname, email } = req.body;
    let { id } = req.params;

    Customer.findByPk(id).then( (customer) => {

        fname = fname ? fname : customer.fname;
        lname = lname ? lname : customer.lname;
        email = email ? email : customer.email;

        customer.update({
            fname,
            lname,
            email
        }).then(res.status(200).send());
    });

});

// Delete Customer
router.delete('/:id', (req, res) => {
    let { id } = req.params;

    Customer
        .findByPk(id)
        .then((customer) => {
            if(customer)
                return customer.destroy();
            else
                return Promise.reject();

    }).then( () => {
        res.status(204).send();
    }, () => {
        res.status(404).send();
    });

    Product.destroy({
        where: {
            customerId : id
        }
    });

});

module.exports = router;