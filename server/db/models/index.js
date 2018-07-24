const User = require('./user');
const Team = require('./team');
const Cohort = require('./cohort');
const Feedback = require('./feedback');

Team.belongsTo(Cohort);
Cohort.hasMany(Team);
Team.hasMany(Feedback);
Feedback.belongsToMany(Team, {through: 'team_feedback'});

module.exports = {
  User,
  Team,
  Cohort,
  Feedback
};
