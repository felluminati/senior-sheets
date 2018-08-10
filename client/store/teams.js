import axios from 'axios';

const initialState = [];

const GET_TEAMS = 'GET_TEAMS';
const ADD_TEAM = 'ADD_TEAM';
const RESET_TEAMS = 'RESET_TEAMS';

const getTeams = (teams) => ({type: GET_TEAMS, teams});
const addTeam = (team) => ({type: ADD_TEAM, team});

export const resetTeams = () => ({type: RESET_TEAMS});

export const fetchTeams = (cohortId, project) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/teams?cohortId=${cohortId}&project=${project}`);
    dispatch(getTeams(data));
  }
  catch (err) {
    console.error(err);
  }
};

export const postTeam = (cohortId, project, teamName) => async dispatch => {
  try {
    const {data} = await axios.post('/api/teams', {cohortId, project, teamName});
    dispatch(addTeam(data));
  }
  catch (err) {
    console.error(err);
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TEAMS:
      return action.teams;
    case ADD_TEAM:
      return [...state, action.team];
    case RESET_TEAMS:
      return initialState;
    default:
      return state;
  }
}
