import React, { Component, PropTypes } from 'react';
import { getFormElements } from 'utils/form-helpers';
import * as userActions from 'actions/user';

import 'styles/components/SignUp.css';

export default class SignUp extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { router } = this.context;
    const formData = getFormElements(this.refs.SignUpForm);
    dispatch(userActions.signup(formData, router));
  }

  render() {
    return (
      <section>
        <div className="panel panel-default SignUp__dialog">
          <div className="panel-heading">
            <h3 className="panel-title">Sign up</h3>
          </div>
          <div className="panel-body">
            <form ref="SignUpForm" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" className="form-control"/>
              </div>
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
