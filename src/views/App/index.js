import React, { Component, PropTypes } from 'react';
import Navbar from './components/Navbar';

export default class App extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
