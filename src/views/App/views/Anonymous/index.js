import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from 'actions/session';
import * as userActions from 'actions/user';

class Anonymous extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

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
})(Anonymous);
