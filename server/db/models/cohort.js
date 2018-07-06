const Sequelize = require('sequelize');
const db = require('../db');

const Cohort = db.define('cohort', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Cohort;
