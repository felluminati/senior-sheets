import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import cohorts from './cohorts';
import selectedCohort from './select-cohort';
import project from './project';
import teams from './teams';
import selectedTeam from './select-team';
import teamFeedback from './team-feedback';

const combinedReducer = combineReducers({user, cohorts, selectedCohort, project, teams, selectedTeam, teamFeedback});

export const resetStore = () => ({type: 'RESET_STORE'});
const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = {cohorts: state.cohorts};
  }
  return combinedReducer(state, action);
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

export default {store, persistor};
export * from './user';
export * from './cohorts';
export * from './select-cohort';
export * from './project';
export * from './teams';
export * from './select-team';
export * from './team-feedback';
