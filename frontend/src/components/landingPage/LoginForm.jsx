import React, { Component } from "react";
import axios from "axios";
import TwoFAForm from "./2FAForm.jsx";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.sendRequest = this.sendRequest.bind(this);

    this.loginForm = (
      <div className="loginForm fade-in">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="loginEmail">Email Address</label>
                <input
                  id="loginEmail"
                  type="email"
                  className="form-control form-control-lrg"
                  required={true}
                  placeholder="someone@example.com"
                  onChange={this.handleChangeEmail}
                ></input>
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <label htmlFor="loginPassword">Password</label>
                <input
                  id="loginPassword"
                  type="password"
                  className="form-control form-control-lrg"
                  required={true}
                  placeholder="•••••••••••"
                  onChange={this.handleChangePassword}
                ></input>
              </div>
            </div>
            <div className="form-row align-items-center justify-content-between">
              <div className="col-4 col-md-2">
                <input
                  type="submit"
                  value="Login"
                  className="form-control btn-success"
                ></input>
              </div>
              <div className="col-8 col-md-10 text-right">
                <small className="form-text">
                  Don't have an account yet? <a href="/">Click here</a> to sign
                  up now.
                </small>
              </div>
            </div>
          </div>
        </form>
      </div>
    );

    this.state = {
      email: "",
      password: "",
      form: this.loginForm,
    };
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.sendRequest((error, data) => {
      if (error) {
        return alert("The username/password is incorrect.");
      }
      this.setState({ form: <TwoFAForm userID={data} /> });
    });
  }

  sendRequest(callback) {
    axios
      .post("/api/auth", this.state, {
        headers: { "content-type": "application/json" },
      })
      .then((response) => {
        if (response.data.errors) {
          throw response.data.errors;
        }
        callback(undefined, response.data);
      })
      .catch((error) => {
        callback(error, undefined);
      });
  }

  render() {
    return <div>{this.state.form}</div>;
  }
}

export default LoginForm;
