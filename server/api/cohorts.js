const router = require('express').Router();
const {Cohort} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const cohorts = await Cohort.findAll();
    res.json(cohorts);
  }
  catch (err) {
    next(err);
  }
});
