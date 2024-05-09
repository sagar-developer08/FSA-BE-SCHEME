// schemaModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConfig');

const Scheme = sequelize.define('Scheme', {
  schemeName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  schemeType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Scheme;
