import axios from "axios";

const initialState = {};

const SELECT_TEAM = 'SELECT_TEAM';
const RESET_TEAM = 'RESET_TEAM';

export const selectTeam = (team) => ({type: SELECT_TEAM, team});
export const resetTeam = (team) => ({type: RESET_TEAM, team});

export const fetchTeam = (teamId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/teams/${teamId}`);
    dispatch(selectTeam(data));
  }
  catch (err) {
    console.error(err);
  }
}


export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_TEAM:
      return action.team;
    case RESET_TEAM:
      return {};
    default:
      return state;
  }
}
