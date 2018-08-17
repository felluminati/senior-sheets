import {expect} from 'chai';
import {fetchTeams, postTeam} from './';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Teams reducer', () => {
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

  describe('fetchTeams', () => {
    it('eventually dispatches the GET TEAMS action', async () => {
      const fakeTeam = {teamName: 'fake team', project: 'graceShopper'};
      mockAxios.onGet(`/api/teams?cohortId=1&project=graceShopper`).replyOnce(200, fakeTeam);
      await store.dispatch(fetchTeams(1, 'graceShopper'));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('GET_TEAMS');
    });
  });

  describe('postTeam', () => {
    it('eventually dispatches the ADD TEAMS and SELECT TEAM action', async () => {
      const fakeTeam = {teamName: 'fake team', project: 'graceShopper', cohortId: 1};
      mockAxios.onPost(`/api/teams`).replyOnce(200, fakeTeam);
      await store.dispatch(postTeam(1, 'graceShopper', 'fake team'));
      const actions = store.getActions();
      expect(actions.length).to.be.equal(1);
      expect(actions[0].type).to.be.equal('ADD_TEAM');
    });
  });

});
