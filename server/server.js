const express = require('express');
const apiRouter = require('./routes')
const app = express();
const db = require('./db');
const Product = require('./models/Product');
const Customer = require('./models/Customer');

Customer.hasMany(Product, {
    as: 'Product'
});

app.use('/api/', apiRouter);

db.authenticate()
    .then( () => console.log('Database connected..'))
    .catch( err => console.log(`Error: ${err}`));

app.listen(process.env.PORT || 3000, () =>
    console.log(`Server is running on port ${process.env.PORT || 3000}`));

