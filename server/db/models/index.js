const User = require('./user');
const Capstone = require('./capstone');
const GraceShopper = require('./graceshopper');
const Cohort = require('./cohort');
const Feedback = require('./feedback');

Cohort.hasMany(Capstone);
Capstone.belongsTo(Cohort);
Cohort.hasMany(GraceShopper);
GraceShopper.belongsTo(Cohort);
GraceShopper.hasMany(Feedback);
Capstone.hasMany(Feedback);
Feedback.belongsToMany(Capstone, {through: 'capstone_feedback'});
Feedback.belongsToMany(GraceShopper,  {through: 'graceshopper_feedback'});


module.exports = {
  User,
  Capstone,
  GraceShopper,
  Cohort,
  Feedback
};
