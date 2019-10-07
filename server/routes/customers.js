const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const { check, validationResult } = require('express-validator');

/**
 * Gets all customers.
 * @param  req
 * @param  res
 */
router.get('/', (req, res) => {
    Customer.findAll().then((customers) => {
        res.json(customers);
    });
});

/**
 * Gets a single customer by id.
 * @param  id
 * @param  req
 * @param  res
 */
router.get('/:id', (req, res) => {
    let { id } = req.params;

    Customer.findByPk(id, {
        include: [{
            model: Product,
            as: 'product'
        }]
    }).then((customer) => {
        customer ? res.json(customer) : res.status(404).json({ errors: { msg: 'Customer with that id not found.' }}).send();
    });
});

/**
 * Creates a customer based on parameters from within the html request body.
 * @param  req
 * @param  res
 */
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

/**
 * Updates a single customer's parameters with new values from within the html request body.
 * @param  id
 * @param  req
 * @param  res
 */
router.put('/:id', (req, res) => {
    let { fname, lname, email } = req.body;
    let { id } = req.params;

    Customer.findByPk(id).then( (customer) => {

        if(customer) {
            fname = fname ? fname : customer.fname;
            lname = lname ? lname : customer.lname;
            email = email ? email : customer.email;

            customer.update({
                fname,
                lname,
                email
            }).then(res.status(200).send());
        }
        else
            res.status(404).json({ errors: { msg: 'Customer with that id not found.' }}).send();
    });

});

/**
 * Deletes a customer by id.
 * @param  id
 * @param  req
 * @param  res
 */
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
        res.status(404).json({ errors: { msg: 'Customer with that id not found.' }}).send();
    });

    Product.destroy({
        where: {
            customerId : id
        }
    });

});

module.exports = router;