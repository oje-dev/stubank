import React, { Component } from "react";
import axios from "axios";
import OverviewPage from "./overview-page.jsx";
import SpendingPage from "./spendingpage.jsx";
import SavingsPage from "./savingspage.jsx";
import PaymentsPage from "./paymentspage.jsx";
import AccountPage from "./accountpage.jsx";
import HelpPage from "./helppage.jsx";
import InvalidAuth from "./invalidauth.jsx";
import AppNavbar from "./app-navbar.jsx";

class ApplicationPage extends Component {
  constructor(props) {
    super(props);

    this.JWTToken = localStorage.getItem("x-auth-token");
    console.log(localStorage.getItem("x-auth-token"));

    this.onOverview = this.onOverview.bind(this);
    this.onSpending = this.onSpending.bind(this);
    this.onSavingsPot = this.onSavingsPot.bind(this);
    this.onPayments = this.onPayments.bind(this);
    this.onAccount = this.onAccount.bind(this);
    this.onHelp = this.onHelp.bind(this);
    this.getTransactions = this.getTransactions.bind(this);

    this.state = {
      current_page: (
        <OverviewPage
          userInfo={this.getUserInfo()}
          accountInfo={this.getAccountInfo()}
          getTransactions={this.getTransactions}
        />
      ),
      isValid: true,
    };
  }

  getUserInfo() {
    return {
      title: "Mr.",
      firstname: "Oliver",
      lastname: "El-kheir",
      phoneno: "+447447800084",
      dob: "01/10/1997",
      uni: "Newcastle University",
      course: "G600",
      address: "19 Cavendish Place, Jesmond",
      city: "Newcastle-upon-Tyne",
      postcode: "NE2 2NE",
      email: "o.elkheir1@newcastle.ac.uk",
    };
  }

  getAccountInfo() {
    return { current_balance: "1232.23" };
    //axios.post('/api/accounts')
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
    const data = axios.get("/api/transactions", {
      headers: {
        "content-type": "application/json",
        "x-auth-token": this.JWTToken,
      },
    });
  }

  onOverview() {
    this.setState(() => {
      return {
        current_page: (
          <OverviewPage
            userInfo={this.getUserInfo()}
            accountInfo={this.getAccountInfo()}
            getTransactions={this.getTransactions}
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

  onSavingsPot() {
    this.setState(() => {
      return { current_page: <SavingsPage /> };
    });
  }

  onPayments() {
    this.setState(() => {
      return { current_page: <PaymentsPage /> };
    });
  }

  onHelp() {
    this.setState(() => {
      return { current_page: <HelpPage /> };
    });
  }

  onAccount() {
    this.setState(() => {
      return {
        current_page: <AccountPage userInfo={this.getUserInfo()} />,
      };
    });
  }

  render() {
    return (
      <div>
        <div className="fade-in container-fluid my-container vh-100">
          <div className="row">
            <div className="col">
              <AppNavbar
                onOverview={this.onOverview}
                onSpending={this.onSpending}
                onSavingsPot={this.onSavingsPot}
                onPayments={this.onPayments}
                onHelp={this.onHelp}
                onAccount={this.onAccount}
              />
            </div>
          </div>
          {this.state.current_page}
          {!this.state.isValid && <InvalidAuth />}
        </div>
      </div>
    );
  }
}

export default ApplicationPage;
