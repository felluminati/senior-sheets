const User = require('./user');
const Team = require('./team');
const Cohort = require('./cohort');
const Feedback = require('./feedback');

Team.belongsTo(Cohort);
Cohort.hasMany(Team);
Team.hasMany(Feedback);
Feedback.belongsTo(Team);
User.belongsTo(Cohort);
Cohort.hasMany(User);

module.exports = {
  User,
  Team,
  Cohort,
  Feedback
};
