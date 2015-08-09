export default class Storage {
  constructor(namespace) {
    this.namespace = namespace;
  }

  get(key) {
    const value = localStorage.getItem(this.namespace + '/' + key);
    return value && JSON.parse(value);
  }

  set(key, value) {
    try {
      localStorage.setItem(this.namespace + '/' + key, JSON.stringify(value));
    } catch(e) {
      return false;
    }
  }

  remove(key) {
    localStorage.removeItem(this.namespace + '/' + key);
  }
}
