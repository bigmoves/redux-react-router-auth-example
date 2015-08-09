/* @flow */

const fetch = window.fetch;

const API = 'http://localhost:8080/v1';

export const auth = {
  token: ''
};

function checkStatus(response): any {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error
  }
}

function parseJSON(response): Object {
  return response.json();
}

function headers(): Object {
  return {
    'Authorization': `JWT ${auth.token}`,
    'Content-Type': 'application/json'
  };
}

function getJSON(url: string): Promise {
  return fetch(`${API}${url}`, {
    method: 'get',
    headers: headers()
  })
  .then(checkStatus)
  .then(parseJSON);
}

function postJSON(url: string, data: Object = {}): Promise {
  return fetch(`${API}${url}`, {
    method: 'post',
    headers: headers(),
    body: JSON.stringify(data)
  })
  .then(checkStatus)
  .then(parseJSON);
}

function putJSON(url: string, data: Object = {}): Promise {
  return fetch(`${API}${url}`, {
    method: 'put',
    headers: headers(),
    body: JSON.stringify(data)
  })
  .then(checkStatus)
  .then(parseJSON);
}

function del(url: string): Promise {
  return fetch(`${API}${url}`, {
    method: 'delete',
    headers: headers()
  })
  .then(checkStatus)
  .then(parseJSON);
}

export default {
  getJSON,
  postJSON,
  putJSON,
  del
};
