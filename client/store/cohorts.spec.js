import {expect} from 'chai';
import {fetchCohorts, postCohort} from './';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Cohorts reducer', () => {
  let store;
  let mockAxios;

  const initialState = [];

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  })

  describe('fetchCohorts', () => {
    it('eventually dispatches the GET COHORTS action', async () => {
      const fakeCohort = {id: 1, name: '1806'};
      mockAxios.onGet(`/api/cohorts`).replyOnce(200, fakeCohort);
      await store.dispatch(fetchCohorts(1, fakeCohort));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('GET_COHORTS');
    });
  });

  describe('postCohorts', () => {
    it('eventually dispatches the ADD COHORT', async () => {
      const fakeCohort = {name: '1806-FSA-CH'};
      mockAxios.onPost(`/api/cohorts`).replyOnce(200, fakeCohort);
      await store.dispatch(postCohort(1, fakeCohort));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('ADD_COHORT');
    });
  });

});
