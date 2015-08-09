import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Dashboard extends Component {

  static propTypes = {
    session: PropTypes.object
  }

  render() {
    const { session } = this.props;
    return (
      <div>
        <h1>Hello, {session.user.name}!</h1>
      </div>
    );
  }
}
