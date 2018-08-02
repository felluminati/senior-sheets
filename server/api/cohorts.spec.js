/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cohort = db.model('cohort');
const Team = db.model('team');

describe('Cohort routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  })

  describe('/api/cohorts/', () => {

    beforeEach(() => {
      return Cohort.create({name: 'Cohort 1'});
    })

    it('GET /api/cohorts', async () => {
      const res = await request(app)
        .get(`/api/cohorts`)
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].name).to.be.equal('Cohort 1');
    });

    it('POST /api/cohorts', async () => {
      const res = await request(app)
        .post(`/api/cohorts`)
        .send({name: 'Cohort 2'})
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.name).to.be.equal('Cohort 2');
    });
  }); // end describe('/api/cohorts')
}); // end describe('Cohort routes')
