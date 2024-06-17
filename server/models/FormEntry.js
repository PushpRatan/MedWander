const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FormEntry = sequelize.define('FormEntry', {
    form_type: { type: DataTypes.STRING(1) },
    name: { type: DataTypes.STRING },
    country_code: { type: DataTypes.STRING(10) },
    phone_number: { type: DataTypes.STRING(15) }
});

module.exports = FormEntry;
