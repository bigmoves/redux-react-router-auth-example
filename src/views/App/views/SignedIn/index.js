import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class SignedIn extends Component {
  render() {
    return (
      <div>
        {this.props.children &&
          React.cloneElement(this.props.children, { ...this.props })}
      </div>
    );
  }
}

export default connect(state => {
  return { session: state.session };
})(SignedIn);
