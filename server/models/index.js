const Sequelize = require('sequelize');
const sequelize = require('../db');
const Product = require('./Product');
const Customer = require('./Customer');

const models = {
    Customer: Customer.init(sequelize, Sequelize),
    Product: Product.init(sequelize, Sequelize)
};

Customer.hasMany(Product, {
    as: 'product',
    foreignKey: 'customerId'
});

Product.belongsTo(Customer, {
    as: 'customer',
    foreignKey: 'customerId'
});

module.exports = models;