const router = require('express').Router();
const {Cohort, GraceShopper, Capstone} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const {cohortId, project} = req.query;
    let teams = null;
    if (project === 'graceShopper') {
      teams = await GraceShopper.findAll({where: {cohortId: +cohortId}});
    }
    else if (project === 'capstone') {
      teams = await Capstone.findAll({where: {cohortId: +cohortId}});
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
      team = await GraceShopper.create({teamName, cohortId: +cohortId});
    }
    else if (project === 'capstone') {
      team = await Capstone.create({teamName, cohortId: +cohortId});
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
