const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// Parsing Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Individual model routers
router.use('/customers', require('./customers'));
router.use('/products', require('./products'));

module.exports = router;