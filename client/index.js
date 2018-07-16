import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import history from './history';
import store from './store';
import App from './app';
import './socket';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif']
  }
});

ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);
