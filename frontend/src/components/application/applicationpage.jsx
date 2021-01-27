import React, { Component } from "react";
import axios from "axios";
import OverviewPage from "./overview-page.jsx";
import SpendingPage from "./spendingpage.jsx";
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
    this.onSpending = this.onSpending.bind(this);
    this.onPayments = this.onPayments.bind(this);
    this.onAccount = this.onAccount.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.getCurrentBalance = this.getCurrentBalance.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getPayments = this.getPayments.bind(this);
    this.getDigitalCard = this.getDigitalCard.bind(this);

    this.state = {
      current_page: (
        <OverviewPage
          userInfo={this.getUserInfo}
          accountInfo={this.getCurrentBalance}
          getTransactions={this.getTransactions}
          getDigitalCard={this.getDigitalCard}
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

  onOverview() {
    this.setState(() => {
      return {
        current_page: (
          <OverviewPage
            userInfo={this.getUserInfo}
            accountInfo={this.getCurrentBalance}
            getTransactions={this.getTransactions}
            getDigitalCard={this.getDigitalCard}
          />
        ),
      };
    });
  }

  onSpending() {
    this.setState(() => {
      return { current_page: <SpendingPage /> };
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
        current_page: <AccountPage userInfo={this.getUserInfo} />,
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
