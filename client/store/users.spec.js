import {expect} from 'chai';
import {fetchUsers, changeAdmin, changeDisabled} from './';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Users reducer', () => {
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

  describe('fetchUsers', () => {
    it('eventually dispatches the GET USERS action', async () => {
      const fakeUser = {id: 1, email: 'cody@email.com', isAdmin: true, isGod: false, isDisabled: false, cohort: null};
      mockAxios.onGet(`/api/users`).replyOnce(200, fakeUser);
      await store.dispatch(fetchUsers());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('GET_USERS');
    });
  });

  describe('changeAdmin', () => {
    it('eventually dispatch the TOGGLE_ADMIN action', async () => {
      const fakeUser = {id: 1, email: 'cody@email.com', isAdmin: true, isGod: false, isDisabled: false, cohort: null};
      mockAxios.onPut(`/api/users/1/admin`).replyOnce(200, {...fakeUser, isAdmin: !fakeUser.isAdmin});
      await store.dispatch(changeAdmin(1));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('TOGGLE_ADMIN');
      expect(actions[0].user.isAdmin).to.be.equal(false);
    });
  });
});
