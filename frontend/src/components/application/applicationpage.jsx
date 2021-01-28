import React, { Component } from "react";
import axios from "axios";
import OverviewPage from "./overview-page.jsx";
import PaymentsPage from "./paymentspage.jsx";
import AccountPage from "./accountpage.jsx";
import InvalidAuth from "./invalidauth.jsx";
import AppNavbar from "./app-navbar.jsx";

class ApplicationPage extends Component {
  constructor(props) {
    super(props);

    //Should be a cookie but ran out of time to implement appropriate middleware.
    this.JWTToken = sessionStorage.getItem("x-auth-token");

    this.onOverview = this.onOverview.bind(this);
    this.onPayments = this.onPayments.bind(this);
    this.onAccount = this.onAccount.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.getCurrentBalance = this.getCurrentBalance.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getPayments = this.getPayments.bind(this);
    this.getDigitalCard = this.getDigitalCard.bind(this);
    this.getPredictedSpending = this.getPredictedSpending.bind(this);

    this.state = {
      current_page: (
        <OverviewPage
          getUserInfo={this.getUserInfo}
          getCurrentBalance={this.getCurrentBalance}
          getTransactions={this.getTransactions}
          getDigitalCard={this.getDigitalCard}
          getPredictedSpending={this.getPredictedSpending}
        />
      ),
      isValid: true,
    };
  }

  getUserInfo(callback) {
    const info = axios
      .get("/api/application", {
        headers: {
          "x-auth-token": this.JWTToken,
        },
      })
      .then((data) => {
        callback(undefined, data);
      })
      .catch((error) => {
        callback(error, undefined);
        this.setState({ isValid: false });
      });
  }

  getCurrentBalance(callback) {
    const balance = axios
      .get("/api/accounts/balance", {
        headers: {
          "x-auth-token": this.JWTToken,
        },
      })
      .then((data) => {
        callback(undefined, data);
      })
      .catch((error) => {
        callback(error, undefined);
        this.setState({ isValid: false });
      });
  }

  getTransactions(callback) {
    const data = axios
      .get("/api/transactions", {
        headers: {
          "content-type": "application/json",
          "x-auth-token": this.JWTToken,
        },
      })
      .then((data) => {
        callback(undefined, data.data);
      })
      .catch((error) => {
        callback(error, undefined);
        this.setState({ isValid: false });
      });
  }

  getPayments(callback) {
    const data = axios
      .get("/api/transactions", {
        headers: {
          "content-type": "application/json",
          "x-auth-token": this.JWTToken,
        },
      })
      .then((data) => {
        callback(undefined, data);
      })
      .catch((error) => {
        callback(error, undefined);
        this.setState({ isValid: false });
      });
  }

  getDigitalCard(callback) {
    const cardInformation = axios
      .get("/api/accounts", { headers: { "x-auth-token": this.JWTToken } })
      .then((data) => {
        callback(undefined, data.data);
      })
      .catch((error) => {
        callback(error, undefined);
        this.setState({ isValid: false });
      });
  }

  getPredictedSpending(callback) {
    const predictedSpend = axios
      .get("/api/transactions/predict", {
        headers: { "x-auth-token": this.JWTToken },
      })
      .then((data) => {
        callback(undefined, data);
      })
      .catch((error) => {
        callback(error, undefined);
        this.setState({ isValid: false });
      });
  }

  changePassword(inputNewPassword, confirmPassword, currentPassword, callback) {
    axios
      .post("/api/users/password", {
        headers: {
          "x-auth-token": this.JWTToken,
          "content-type": "application/json",
        },
        body: {
          newPassword: inputNewPassword,
          password: currentPassword,
          password2: confirmPassword,
        },
      })
      .then(() => {
        callback(undefined);
      })
      .catch((error) => {
        callback(error);
      });
  }

  onOverview() {
    this.setState(() => {
      return {
        current_page: (
          <OverviewPage
            getUserInfo={this.getUserInfo}
            getCurrentBalance={this.getCurrentBalance}
            getTransactions={this.getTransactions}
            getDigitalCard={this.getDigitalCard}
            getPredictedSpending={this.getPredictedSpending}
          />
        ),
      };
    });
  }

  onPayments() {
    this.setState(() => {
      return { current_page: <PaymentsPage /> };
    });
  }

  onAccount() {
    this.setState(() => {
      return {
        current_page: (
          <AccountPage
            getUserInfo={this.getUserInfo}
            changePassword={this.changePassword}
          />
        ),
      };
    });
  }

  render() {
    return (
      <div className="fade-in container-fluid my-container vh-100">
        <div className="row">
          <div className="col">
            <AppNavbar
              onOverview={this.onOverview}
              onSpending={this.onSpending}
              onPayments={this.onPayments}
              onAccount={this.onAccount}
            />
          </div>
        </div>
        {this.state.current_page}
        {!this.state.isValid && <InvalidAuth />}
      </div>
    );
  }
}

export default ApplicationPage;
