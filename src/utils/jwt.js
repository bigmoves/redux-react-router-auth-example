import Base64 from './base64';

export default {
  payload(token) {
    if (!token) { return {}; }

    const parts = token.split('.');

    if (!parts[1]) {
      console.error(`JWT token is missing payload section: ${token}`);
    }

    try {
      const decoded = Base64.decode(parts[1]);
      return JSON.parse(decoded);
    } catch(e) {
      throw new Error('JWT token has invalid payload: ' + token);
    }
  }
};
