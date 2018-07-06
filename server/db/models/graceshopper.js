const Sequelize = require('sequelize');
const db = require('../db');

const GraceShopper = db.define('graceshopper', {
  teamName: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = GraceShopper;
