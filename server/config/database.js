const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('medwander', 'root', 'Pushp9029@r', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
