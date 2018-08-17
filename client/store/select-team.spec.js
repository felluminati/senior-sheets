import {expect} from 'chai';
import {fetchTeam} from './';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Select Team reducer', () => {
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

  describe('fetchTeam', () => {
    it('eventually dispatches the SELECT TEAM action', async () => {
      const fakeTeam = {teamName: 'fake team', project: 'graceShopper'};
      mockAxios.onGet(`/api/teams/1`).replyOnce(200, fakeTeam);
      await store.dispatch(fetchTeam(1));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('SELECT_TEAM');
    });
  });

});
