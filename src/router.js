import React from 'react';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import App from './views/App';
import Anonymous from './views/App/views/Anonymous';
import Home from './views/App/views/Anonymous/views/Home';
import Login from './views/App/views/Anonymous/views/Login';
import SignUp from './views/App/views/Anonymous/views/SignUp';
import SignOut from './views/App/views/Anonymous/views/SignOut';
import SignedIn from './views/App/views/SignedIn';
import Dashboard from './views/App/views/SignedIn/views/Dashboard';
import * as sessionActions from './actions/session';

function fetchSession(nextState, transition, cb) {
  const { dispatch } = this.component.store;
  dispatch(sessionActions.fetch(() => {
    cb();
  }));
}

function checkAuth(nextState, transition, cb) {
  const { store } = this.component;
  if (store.getState().session.isAuthenticated) {
    cb();
  } else {
    transition.to('/login');
    cb();
  }
};

function signOutUser(nextState, transition, cb) {
  const { dispatch } = this.component.store;
  dispatch(sessionActions.close());
  transition.to('/login');
  cb();
}

export default function(store) {
  App.store = store;
  SignedIn.store = store;
  SignOut.store = store;
  return (
    <Router history={history}>
      <Route component={App} onEnter={fetchSession}>
        <Route component={Anonymous}>
          <Route name="home" component={Home} path="/"/>
          <Route name="login" component={Login} path="/login"/>
          <Route name="signup" component={SignUp} path="/signup"/>
          <Route name="signout" component={SignOut} path="/signout" onEnter={signOutUser}/>
        </Route>
        <Route component={SignedIn} onEnter={checkAuth}>
          <Route name="dashboard" component={Dashboard} path="/dashboard"/>
        </Route>
      </Route>
    </Router>
  );
};
