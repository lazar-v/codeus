const Sequelize = require('sequelize');
const sequelize = require('../db');

const productSchema = {
    productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}

class Product extends Sequelize.Model {
    static init(sequelize) {
        return super.init(productSchema, {
            sequelize,
            tableName: 'products'
        });
    }
}

module.exports = Product;