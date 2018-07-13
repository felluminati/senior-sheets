import axios from 'axios';

const initialState = [];

const GET_TEAMS = 'GET_TEAMS';
const ADD_TEAM = 'ADD_TEAM';

const getTeams = (teams) => ({type: GET_TEAMS, teams});
const addTeam = team => ({type: ADD_TEAM, team});

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
    default:
      return state;
  }
}
