/* @flow */

import * as ActionTypes from '../constants/ActionTypes';
import { auth } from '../utils/API';
import SessionAPI from '../utils/SessionAPI';
import Storage from '../utils/Storage';
import JWT from '../utils/jwt';
import type { Credentials } from '../types/Session';

const storage = new Storage('auth-example');

export function open(
  credentials: Credentials,
  router: Object
) {
  return dispatch => {
    SessionAPI.createSession(credentials).then(tokenPayload => {
      storage.set('auth_token', tokenPayload.token);
      auth.token = tokenPayload.token;
      return SessionAPI.getCurrentUser();
    }).then(user => {
      dispatch({
        type: ActionTypes.Session.USER_LOGIN_COMPLETED,
        user
      });

      const { query } = router.state.location;
      if (query && query.redirect) {
        router.replaceWith(query.redirect);
      } else {
        router.replaceWith('/dashboard');
      }
    }).catch(error => {
      dispatch({
        type: ActionTypes.Session.USER_LOGIN_FAILED,
        error
      });
    });
  }
}

export function fetch(cb) {
  return dispatch => {
    const token = storage.get('auth_token');

    if (!token) {
      return cb(null);
    }

    auth.token = token;
    const jwtPayload = JWT.payload(token);

    SessionAPI.getCurrentUser().then(user => {
      dispatch({
        type: ActionTypes.Session.USER_LOGIN_COMPLETED,
        user
      });
      cb(null);
    }).catch(() => cb(null));
  }
}

export function close() {
  return dispatch => {
    storage.remove('auth_token');
    auth.token = '';
    dispatch({
      type: ActionTypes.Session.USER_LOGOUT_COMPLETED
    });
  }
}
