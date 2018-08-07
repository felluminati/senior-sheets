const {User} = require('./db/models');

module.exports = {
  isAdmin: () => async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (user.isAdmin) {
        next();
      }
      else {
        const err = new Error('You do not have admin access');
        err.status = 403;
        next(err);
      }
    } catch (err) {
      next(err);
    }
  },
  isGod: () => async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (user.isGod) {
        next();
      }
      else {
        const err = new Error('You do not have god access');
        err.status = 403;
        next(err);
      }
    } catch (err) {
      next(err);
    }
  }
};
