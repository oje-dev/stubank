import React, { Component } from "react";
import LandingForm from "./LandingForm.jsx";
import CreateAccountForm from "./CreateAccountForm.jsx";
import LoginForm from "./LoginForm.jsx";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.onCreateAccount = this.onCreateAccount.bind(this);
    this.onLogin = this.onLogin.bind(this);

    this.state = {
      form: (
        <LandingForm
          onCreateAccount={this.onCreateAccount}
          onLogin={this.onLogin}
        />
      ),
    };
  }

  onCreateAccount() {
    this.setState(() => {
      return {
        form: <CreateAccountForm />,
      };
    });
  }

  onLogin() {
    this.setState(() => {
      return {
        form: <LoginForm />,
      };
    });
  }

  render() {
    return (
      <div className="container-fluid backgroundContainer backgroundLanding">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col col-md-6 col-lg-4 align-text-center">
            {this.state.form}
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
