const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_URI, {
    dialect: 'mysql',
    logging:false
});

module.exports = sequelize;
