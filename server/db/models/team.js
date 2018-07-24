const Sequelize = require('sequelize');
const db = require('../db');

const Team = db.define('team', {
  teamName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  project: {
    type: Sequelize.ENUM('capstone', 'graceShopper'),
    allowNull: false
  }
});

module.exports = Team;
