import React from 'react';
import Router from 'react-router';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import router from './router';
import * as stores from './stores';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);
const reducers = combineReducers(stores);
const store = finalCreateStore(reducers);

React.render(
  <div>
    <Provider store={store}>
      {() => router(store)}
    </Provider>
    <DebugPanel top left bottom style={{ zIndex: 10000 }}>
      <DevTools store={store} monitor={LogMonitor}/>
    </DebugPanel>
  </div>,
  document.getElementById('app')
);
