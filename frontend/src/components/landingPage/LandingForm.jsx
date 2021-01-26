import React, { Component } from "react";

export default class LandingForm extends Component {
  constructor(props) {
    super(props);

    this.onCreateAccount = this.onCreateAccount.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onCreateAccount() {
    this.props.onCreateAccount();
  }

  onLogin() {
    this.props.onLogin();
  }

  render() {
    return (
      <div className="fade-in">
        <div className="row justify-content-center stubankText">StuBank ©</div>
        <div className="row justify-content-center sloganText">
          Innovative Banking for Students
        </div>
        <div className="row justify-content-center">
          <div className="btns">
            <button
              className="btn-success btnCreateAccount btn-sm"
              onClick={this.onCreateAccount}
            >
              Open an Account
            </button>
            <button
              className="btn-light btnLogin btn-sm"
              onClick={this.onLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
