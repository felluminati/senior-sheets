const Sequelize = require('sequelize');
const db = require('../db');

const Feedback = db.define('feedback', {
  date: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  teamwork: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  morale: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  comments: {
    type: Sequelize.TEXT,
    allowNull: true,
  }
});

module.exports = Feedback;
