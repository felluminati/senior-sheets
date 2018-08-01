/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Feedback = db.model('feedback');
const Team = db.model('team');

describe('Feedback routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  })

  describe('/api/feedback/', () => {
    let team;
    let testDate = new Date();

    beforeEach(async () => {
      team = await Team.create({teamName: 'Team 1', project: 'graceShopper'});
      return Feedback.create({
        teamwork: 7,
        morale: 9,
        comments: 'They are doing well!',
        date: testDate,
        teamId: team.id
      })
    })

    it('GET /api/feedback', async () => {
      const res = await request(app)
        .get(`/api/feedback/${team.id}`)
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].teamwork).to.be.equal(7);
      expect(res.body[0].morale).to.be.equal(9);
      expect(res.body[0].comments).to.be.equal('They are doing well!');
    });

    it('POST /api/feedback', async () => {
      const res = await request(app)
        .post(`/api/feedback/${team.id}`)
        .send({teamwork: 8, morale: 4, comments: 'awesome', date: testDate})
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.teamwork).to.be.equal(8);
      expect(res.body.morale).to.be.equal(4);
      expect(res.body.comments).to.be.equal('awesome');
    });

    it('PUT /api/feedback', async () => {
      const res = await request(app)
        .put(`/api/feedback/${team.id}`)
        .send({feedbackId: 1, teamwork: 3, morale: 4, date: testDate})
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.teamwork).to.be.equal(3);
      expect(res.body.morale).to.be.equal(4);
      expect(res.body.comments).to.be.equal('They are doing well!');
    });
  }); // end describe('/api/feedback')
}); // end describe('Feedback routes')
