const router = require('express').Router();
const {Cohort, Team} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const {cohortId, project} = req.query;
    let teams = null;
    if (project === 'graceShopper') {
      teams = await Team.findAll({where: {cohortId: +cohortId, project}});
    }
    else if (project === 'capstone') {
      teams = await Team.findAll({where: {cohortId: +cohortId, project}});
    }
    else {
      const err = new Error('Not Grace Shopper or Capstone!');
      err.status = 404;
      return next(err);
    }
    res.json(teams);
  }
  catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {teamName, project, cohortId} = req.body;
    let team = null;
    if (project === 'graceShopper') {
      team = await Team.create({teamName, cohortId: +cohortId, project});
    }
    else if (project === 'capstone') {
      team = await Team.create({teamName, cohortId: +cohortId, project});
    }
    else {
      const err = new Error('Not Grace Shopper or Capstone!');
      err.status = 404;
      return next(err);
    }
    res.json(team);
  }
  catch (err) {
    next(err);
  }
});

router.get('/:teamId', async (req, res, next) => {
  try {
    const {teamId} = req.params;
    const team = await Team.findById(teamId);
    res.json(team);
  }
  catch (err) {
    next(err);
  }
});
