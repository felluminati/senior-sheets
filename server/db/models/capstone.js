const Sequelize = require('sequelize');
const db = require('../db');

const Capstone = db.define('capstone', {
  teamName: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Capstone;
