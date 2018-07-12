import axios from 'axios';

const  GET_COHORTS = 'GET_COHORTS';
const  ADD_COHORT = 'ADD_COHORT';
const  SELECT_COHORT = 'SELECT_COHORT';

const initialState = {
  cohorts: [],
  selectedCohort: {},
};

const getCohorts = cohorts => ({GET_COHORTS, cohorts});
const addCohort = cohort => ({ADD_COHORT, cohort});
const selectCohort = cohort => ({SELECT_COHORTS, cohort});

export const fetchCohorts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cohorts');
    dispatch(getCohorts(data));
  }
  catch (err) {
    console.error(err);
  }
};

export const postCohort = (name) => async dispatch => {
  try {
    const {data} = await axios.post('/api/cohorts', {name});
    dispatch(addCohort(data));
  }
  catch (err) {
    console.error(err);
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COHORTS:
      return {...state, cohorts: action.cohorts};
    case ADD_COHORT:
      return {...state, cohorts: [...state.cohorts, action.cohort]};
    case SELECT_COHORT:
      return {...state, selectedCohort: action.cohort};
    default: {
      return state;
    }
  }
}
