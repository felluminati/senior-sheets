import axios from 'axios';

const  GET_COHORTS = 'GET_COHORTS';
const  ADD_COHORT = 'ADD_COHORT';


const initialState = [];

const getCohorts = cohorts => ({type: GET_COHORTS, cohorts});
const addCohort = cohort => ({type: ADD_COHORT, cohort});


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
    const {data} = await axios.post('/api/cohorts', {name: name});
    dispatch(addCohort(data));
  }
  catch (err) {
    console.error(err);
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COHORTS:
      return action.cohorts;
    case ADD_COHORT:
      return [...state, action.cohort];
    default: {
      return state;
    }
  }
}
