/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cohort = db.model('cohort');
const Team = db.model('team');

describe('Team routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  })

  describe('/api/teams/', () => {
    let graceShopperTeam;
    let capstoneTeam;
    let cohort;

    beforeEach(async () => {
      cohort = await Cohort.create({name: 'Cohort 1'});
      graceShopperTeam = await Team.create({teamName: 'Team 1', project: 'graceShopper', cohortId: cohort.id});
      capstoneTeam = await Team.create({teamName: 'Team 2', project: 'capstone', cohortId: cohort.id});
    })

    it('GET /api/teams graceShopper team', async () => {
      const res = await request(app)
        .get(`/api/teams?cohortId=${cohort.id}&project=graceShopper`)
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].teamName).to.be.equal('Team 1');
      expect(res.body[0].project).to.be.equal('graceShopper');
    });

    it('GET /api/teams capstone team', async () => {
      const res = await request(app)
        .get(`/api/teams?cohortId=${cohort.id}&project=capstone`)
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].teamName).to.be.equal('Team 2');
      expect(res.body[0].project).to.be.equal('capstone');
    });

    it('POST /api/teams', async () => {
      const res = await request(app)
        .post(`/api/teams`)
        .send({teamName: 'Team 3', project: 'graceShopper', cohortId: cohort.id})
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.teamName).to.be.equal('Team 3');
      expect(res.body.project).to.be.equal('graceShopper');
    });

    it('POST /api/teams w/ invalid project', async () => {
      const res = await request(app)
        .post(`/api/teams`)
        .send({teamName: 'Team 4', project: 'hackathon', cohortId: cohort.id})
        .expect(404);
    });
  }); // end describe('/api/teams')
}); // end describe('Team routes')
