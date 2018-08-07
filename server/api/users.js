const router = require('express').Router();
const {User} = require('../db/models');
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
    const user = await User.findById(req.params.id);
    await user.update({isAdmin: !user.isAdmin});
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/disable', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    await user.update({isDisabled: !user.isDisabled});
    res.json(user);
  } catch (err) {
    next(err);
  }
});
