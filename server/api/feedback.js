const router = require('express').Router();
const {Feedback} = require('../db/models');
module.exports = router;

router.get('/:teamId', async (req, res, next) => {
  const { teamId } = req.params;
  try {
    const team_feedback = await Feedback.findAll({where: {teamId}});
    res.json(team_feedback);
  }
  catch (err) {
    next(err);
  }
});

router.post('/:teamId', async (req, res, next) => {
  try {
    const {teamId} = req.params;
    const {teamwork, morale, comments, date} = req.body;
    const newFeedback = await Feedback.create({teamwork, morale, comments, date, teamId});
    res.json(newFeedback);
  }
  catch (err) {
    next(err);
  }
});

router.delete('/:feedbackId', async (req, res, next) => {
  try {
    const {feedbackId} = req.params;
    const deletedFeedback = await Feedback.destroy({where: {id: feedbackId}});
    res.json('Successfully deleted!');
  }
  catch (err) {
    next(err)
  }
})
