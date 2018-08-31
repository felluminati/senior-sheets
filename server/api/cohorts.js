const router = require('express').Router();
const {Cohort} = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const id = req.user.cohort.id || 0;
    const cohorts = await Cohort.findAll({where: {id: {
        [Op.ne]: id
      }}});
    res.json(cohorts);
  }
  catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {name} = req.body;
    const newCohort = await Cohort.create({name});
    res.json(newCohort);
  }
  catch (err) {
    next(err);
  }
});
