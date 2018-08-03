import {expect} from 'chai';
import {fetchTeamFeedback, postTeamFeedback, deleteTeamFeedback, putTeamFeedback} from './';
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
  let newDate;

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

  describe('fetchTeams', () => {
    it('eventually dispatches the GET TEAM FEEDBACK action', async () => {
      const fakeTeamFeedback = {comments: 'awesome team work', morale: 7, teamwork: 9, date: newDate};
      mockAxios.onGet(`/api/feedback/1`).replyOnce(200, fakeTeamFeedback);
      await store.dispatch(fetchTeamFeedback(1, 'graceShopper'));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('GET_TEAM_FEEDBACK');
    });
  });

  describe('postTeamFeedback', () => {
    it('eventually dispatches the ADD TEAM FEEDBACK and pushes history to /feedback/view', async () => {
      const fakeTeamFeedback = {comments: 'awesome team work', morale: 7, teamwork: 9, date: newDate};
      mockAxios.onPost(`/api/feedback/1`).replyOnce(200, fakeTeamFeedback);
      await store.dispatch(postTeamFeedback(1, fakeTeamFeedback));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('ADD_TEAM_FEEDBACK');
      expect(history.location.pathname).to.be.equal('/feedback/view');
    });
  });

  describe('deleteTeamFeedback', () => {
    it('eventually dispatches the REMOVE TEAM FEEDBACK', async () => {
      const fakeTeamFeedback = {comments: 'awesome team work', morale: 7, teamwork: 9, date: newDate};
      mockAxios.onDelete(`/api/feedback/1`).replyOnce(200);
      await store.dispatch(deleteTeamFeedback(1));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('REMOVE_TEAM_FEEDBACK');
    });
  });

  describe('pitTeamFeedback', () => {
    it('eventually dispatches the EDIT TEAM FEEDBACK and pushes history to /feedback/view', async () => {
      const fakeTeamFeedback = {id: 1, comments: 'awesome team work', morale: 7, teamwork: 9, date: newDate};
      mockAxios.onPut(`/api/feedback/1`).replyOnce(200, fakeTeamFeedback);
      await store.dispatch(putTeamFeedback(fakeTeamFeedback));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('EDIT_TEAM_FEEDBACK');
      expect(history.location.pathname).to.be.equal('/feedback/view');
    });
  });

});
