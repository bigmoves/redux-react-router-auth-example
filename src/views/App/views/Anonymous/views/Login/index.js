import React, { Component, PropTypes } from 'react';
import { getFormElements } from 'utils/form-helpers';
import * as sessionActions from 'actions/session';

import 'styles/components/Login.css';

export default class Login extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { router } = this.context;
    const credentials = getFormElements(this.refs.LoginForm);
    dispatch(sessionActions.open(credentials, router));
  }

  render() {
    return (
      <section>
        <div className="panel panel-default Login__dialog">
          <div className="panel-heading">
            <h3 className="panel-title">Login</h3>
          </div>
          <div className="panel-body">
            <form ref="LoginForm" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className="form-control"/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className="form-control"/>
              </div>
              <input type="submit" className="btn btn-primary" value="Submit"/>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
