const router = require('express').Router();
const {User, Cohort} = require('../db/models');
const {isGod} = require('../gateways');
module.exports = router;


router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'isAdmin', 'isGod', 'isDisabled'],
      include: ['cohort'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/admin', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, {attributes: ['id', 'email', 'isAdmin', 'isGod', 'isDisabled'],
      include: ['cohort']});
    await user.update({isAdmin: !user.isAdmin});
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/disable', isGod, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, {attributes: ['id', 'email', 'isAdmin', 'isGod', 'isDisabled'],
      include: ['cohort']});
    await user.update({isDisabled: !user.isDisabled});
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/god', isGod, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, {attributes: ['id', 'email', 'isAdmin', 'isGod', 'isDisabled'],
        include: ['cohort']});
    await user.update({isGod: !user.isGod});
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/setCohort', isGod, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, {attributes: ['id', 'email', 'isAdmin', 'isGod', 'isDisabled'],
      include: ['cohort']});
    const cohort = await Cohort.findById(req.body.cohortId);
    const updatedUser = await user.setCohort(cohort);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});
