import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import users from './users';
import cohorts from './cohorts';
import teams from './teams';
import teamFeedback from './team-feedback';

const combinedReducer = combineReducers({user, users, cohorts, teams, teamFeedback});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);

const store = createStore(combinedReducer, middleware);


export default store;
export * from './user';
export * from './users';
export * from './cohorts';
export * from './teams';
export * from './team-feedback';
