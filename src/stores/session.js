/* @flow */

import * as ActionTypes from '../constants/ActionTypes';
import type { User } from '../types/User';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: ''
};

export default function session(
  state: Object = initialState,
  action: {
    type: string;
    user: User;
  }
): {
  isAuthenticated: bool;
  user?: ?User;
  error?: string;
} {
  switch (action.type) {
  case ActionTypes.Session.USER_LOGIN_COMPLETED:
    return {
      ...state,
      isAuthenticated: true,
      user: action.user,
      error: ''
    };

  case ActionTypes.Session.USER_LOGIN_FAILED:
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      error: action.error.response.statusText
    };

  case ActionTypes.Session.USER_LOGOUT_COMPLETED:
    return {
      ...state,
      ...initialState
    };

  default:
    return state;
  }
}
