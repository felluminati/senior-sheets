
const initialState = '';

const SELECT_PROJECT = 'SELECT_PROJECT';

export const selectProject = (project) => ({type: SELECT_PROJECT, project});

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_PROJECT:
      return action.project;
    default:
      return state;
  }
}
