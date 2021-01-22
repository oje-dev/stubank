import React from "react";

export default class LoginForm extends React.Component {
  render() {
    return (
      <div className="loginForm fade-in">
        <form>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="loginEmail">Email Address</label>
                <input
                  id="loginEmail"
                  type="email"
                  className="form-control form-control-lrg"
                  required="true"
                  placeholder="someone@example.com"
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
                  required="true"
                  placeholder="•••••••••••"
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
  }
}
