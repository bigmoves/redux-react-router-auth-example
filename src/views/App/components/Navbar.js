import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import 'styles/components/Navbar.css';

class Navbar extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    const { session } = this.props;
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">Project name</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
            </ul>
            {session.isAuthenticated ? this._renderUserDropdown() : this._renderSigninSignupButtons()}
          </div>
        </div>
      </nav>
    );
  }

  _renderUserDropdown() {
    const { session } = this.props;
    const { router } = this.context;

    return (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{session.user.email}<span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a href="#" onClick={(e) => {
              e.preventDefault();
              router.transitionTo('signout');
            }}>Signout</a></li>
          </ul>
        </li>
      </ul>
    );
  }

  _renderSigninSignupButtons() {
    const { router } = this.context;

    return (
      <ul className="nav navbar-nav navbar-right">
        <li><button type="button" className="btn btn-default navbar-btn--right" onClick={() => router.transitionTo('login')}>Sign in</button></li>
        <li><button type="button" className="btn btn-success navbar-btn" onClick={() => router.transitionTo('signup')}>Sign up</button></li>
      </ul>
    );
  }
}

export default connect(state => {
  return { session: state.session };
})(Navbar);
