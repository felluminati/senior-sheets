import axios from 'axios';

const GET_USERS = 'GET_USERS';
const TOGGLE_ADMIN = 'TOGGLE_ADMIN';
const TOGGLE_DISABLED = 'TOGGLE_DISABLED';

const getUsers = (users) => ({type: GET_USERS, users});
const toggleAdmin = (user) => ({type: TOGGLE_ADMIN, user});
const toggleDisabled = (user) => ({type: TOGGLE_DISABLED, user});

export const fetchUsers = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/users');
    dispatch(getUsers(data));
  } catch (err) {
    console.error(err);
  }
};

export const changeAdmin = (id) => async (dispatch) => {
  try {
    const {data} = await axios.put(`/api/users/${id}/admin`);
    dispatch(toggleAdmin(data));
  } catch (err) {
    console.error(err);
  }
};

export const changeDisabled = (id) => async (dispatch) => {
  try {
    const {data} = await axios.put(`/api/users/${id}/disable`);
    dispatch(toggleDisabled(data));
  } catch (err) {
    console.error(err);
  }
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case TOGGLE_ADMIN:
      return state.map((user) => {
        if (user.id === action.user.id) return action.user;
        else return user;
      });
    case TOGGLE_DISABLED:
    return state.map((user) => {
      if (user.id === action.user.id) return action.user;
      else return user;
    });
    default:
      return state;
  }
}
