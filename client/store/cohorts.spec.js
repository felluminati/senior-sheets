import {expect} from 'chai';
import {fetchCohorts, postCohort} from './';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Team-feedback reducer', () => {
  let store;
  let mockAxios;

  const initialState = [];

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
    newDate = new Date();
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

  // describe('postTeamFeedback', () => {
  //   it('eventually dispatches the ADD TEAM FEEDBACK and pushes history to /feedback/view', async () => {
  //     const fakeTeamFeedback = {comments: 'awesome team work', morale: 7, teamwork: 9, date: newDate};
  //     mockAxios.onPost(`/api/feedback/1`).replyOnce(200, fakeTeamFeedback);
  //     await store.dispatch(postTeamFeedback(1, fakeTeamFeedback));
  //     const actions = store.getActions();
  //     expect(actions[0].type).to.be.equal('ADD_TEAM_FEEDBACK');
  //     expect(history.location.pathname).to.be.equal('/feedback/view');
  //   });
  // });

});
