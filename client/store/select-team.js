
const initialState = {};

const SELECT_TEAM = 'SELECT_TEAM';
const RESET_TEAM = 'RESET_TEAM';

export const selectTeam = (team) => ({type: SELECT_TEAM, team});
export const resetTeam = (team) => ({type: RESET_TEAM, team});

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_TEAM:
      return action.team;
    default:
      return state;
  }
}
