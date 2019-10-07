const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();


/**
 * Parsing Middleware
 */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * Individual model routers.
 */
const customerRouter = require('./customers');
const productRouter = require('./products');

router.use('/customers', customerRouter);
router.use('/products', productRouter);

module.exports = router;