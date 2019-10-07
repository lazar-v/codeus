const Sequelize = require('sequelize');

if(process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        port: match[4],
        host: match[3],
        logging: true
    });
}
else {
    sequelize = new Sequelize('postgres://codeus:codeus@localhost:5432/codeus');
}

module.exports = sequelize;

