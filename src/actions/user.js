/* @flow */

import * as ActionTypes from '../constants/ActionTypes';
import UserAPI from '../utils/UserAPI';
import type { User } from '../types/User';

export function signup(user: User, router: Object) {
  return dispatch => {
    UserAPI.createUser(user).then(() => {
      dispatch({
        type: ActionTypes.User.USER_SIGNUP_COMPLETED
      });
      router.transitionTo('/login');
    }).catch(error => {
      dispatch({
        type: ActionTypes.User.USER_SIGNUP_FAILED,
        error
      });
    });
  }
}
