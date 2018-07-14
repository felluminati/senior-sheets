import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import cohorts from './cohorts';
import selectedCohort from './select-cohort';
import project from './project';
import teams from './teams';
import selectedTeam from './select-team';

const reducer = combineReducers({user, cohorts, selectedCohort, project, teams, selectedTeam});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './cohorts';
export * from './select-cohort';
export * from './project';
export * from './teams';
export * from './select-team';
