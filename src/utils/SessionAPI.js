/* @flow */

import API from './API';
import type { Credentials } from '../types/Session';
import type { User } from '../types/User';

type TokenPayload = {
  token: string;
};

function createSession(credentials: Credentials): Promise<TokenPayload> {
  return API.postJSON('/sessions', credentials);
}

function getCurrentUser(): Promise<User> {
  return API.getJSON('/me');
}

export default {
  createSession,
  getCurrentUser
};
