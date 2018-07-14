
const initialState = {};

const  SELECT_COHORT = 'SELECT_COHORT';

export const selectCohort = (cohort) => ({type: SELECT_COHORT, cohort});

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_COHORT:
      return action.cohort;
    default:
      return state;
  }
}
