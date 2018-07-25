import axios from 'axios';
import history from '../history';

const initialState = [];

const GET_TEAM_FEEDBACK = 'GET_TEAM_FEEDBACK';
const ADD_TEAM_FEEDBACK = 'ADD_TEAM_FEEDBACK';
const REMOVE_TEAM_FEEDBACK = 'REMOVE_TEAM_FEEDBACK';

const getTeamFeedback = (feedback) => ({type: GET_TEAM_FEEDBACK, feedback});
const addTeamFeedback = (feedback) => ({type: ADD_TEAM_FEEDBACK, feedback});
const removeTeamFeedback = (feedbackId) => ({type: REMOVE_TEAM_FEEDBACK, feedbackId});

export const fetchTeamFeedback = (teamId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/feedback/${teamId}`);
    dispatch(getTeamFeedback(data));
  }
  catch (err) {
    console.error(err);
  }
};

export const postTeamFeedback = (teamId, feedback) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/feedback/${teamId}`, feedback);
    dispatch(addTeamFeedback(data));
    history.push('/feedback/view');
  }
  catch (err) {
    console.error(err);
  }
};

export const deleteTeamFeedback = (feedbackId) => async dispatch => {
  try {
    await axios.delete(`/api/feedback/${feedbackId}`);
    dispatch(removeTeamFeedback(feedbackId));
  }
  catch (err){
    console.error(err);
  }
}


export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TEAM_FEEDBACK:
      return action.feedback;
    case ADD_TEAM_FEEDBACK:
      return [...state, action.feedback];
    case REMOVE_TEAM_FEEDBACK:
      return state.filter(feedback => +feedback.id !== +action.feedbackId);
    default:
      return state;
  }
}
