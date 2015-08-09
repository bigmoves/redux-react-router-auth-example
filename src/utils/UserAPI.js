/* @flow */

import API from './API';

function createUser(user: Object): Promise {
  return API.postJSON('/signup', user);
}

export default {
  createUser
};
