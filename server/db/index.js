const Sequelize = require('sequelize');

sequelize = new Sequelize(`postgres://wycepjsqpnynto:05728740ec601dfedfd057a0a858610495bd10e4c8837368af2f651e005dfb11@ec2-54-225-205-79.compute-1.amazonaws.com:5432/d73m52c70lcqnl?ssl=true`, {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: true
});

// sequelize = new Sequelize('postgres://codeus:codeus@localhost:5432/codeus');


module.exports = sequelize;

