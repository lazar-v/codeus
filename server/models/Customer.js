const Sequelize = require('sequelize');
const sequelize = require('../db');

const customerSchema = {
    customerId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

class Customer extends Sequelize.Model {
    static init(sequelize) {
        return super.init(customerSchema, {
            sequelize,
            tableName: 'customer'
        });
    }
}

module.exports = Customer;