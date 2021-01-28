import React, { Component } from "react";
import axios from "axios";
import OverviewPage from "./overview-page.jsx";
import PaymentsPage from "./paymentspage.jsx";
import AccountPage from "./accountpage.jsx";
import PayeesPage from "./payeespage.jsx";
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
    this.onPayees = this.onPayees.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.getCurrentBalance = this.getCurrentBalance.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getDigitalCard = this.getDigitalCard.bind(this);
    this.getPredictedSpending = this.getPredictedSpending.bind(this);
    this.getPayees = this.getPayees.bind(this);
    this.addPayee = this.addPayee.bind(this);
    this.deletePayee = this.deletePayee.bind(this);
    this.sendPayment = this.sendPayment.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.state = {
      current_page: (
        <OverviewPage
          getUserInfo={this.getUserInfo}
          getCurrentBalance={this.getCurrentBalance}
          getTransactions={this.getTransactions}
          getDigitalCard={this.getDigitalCard}
          getPredictedSpending={this.getPredictedSpending}
          getPayees={this.getPayees}
          formatCurrency={this.formatCurrency}
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

  getPayees(callback) {
const config = { headers: {
  "x-auth-token": this.JWTToken
}}

    const payeesList = axios
      .get("/api/payees", config

      )
      .then((data) => {
        callback(undefined, data);
      })
      .catch((error) => {
        callback(error, undefined);
        this.setState({ isValid: false });
      });
  }

  addPayee(payeeEmail, callback) {
    console.log(this.JWTToken);
    const config = { headers: {
      "Content-Type": "application/json",
      "x-auth-token": this.JWTToken
    }
  }
    const body = {
      "email": payeeEmail 
    }
    
    const addPayeeReq = axios
      .put("/api/payees",body, config)
      .then((data) => {
        callback(undefined, data);
      })
      .catch((error) => {
        console.log(error);
        callback(error, undefined);
      });
  }

  deletePayee(payeeID, callback) {
    console.log(this.JWTToken);
    
    const deletePayee = axios.delete("/api/payees", {headers: {
      "Content-Type": "application/json",
      "x-auth-token": this.JWTToken
    }, data: {"id": payeeID}})
      .then((data) => {
        callback(undefined, data);
      })
      .catch((error) => {
        callback(error, undefined);
      });
  }

  changePassword(inputNewPassword, confirmPassword, currentPassword, callback) {
    console.log(this.JWTToken);

    const config = { headers: {
      "Content-Type": "application/json",
      "x-auth-token": this.JWTToken
    }
  }
    const body = {
      "newPassword": inputNewPassword,
      "password": currentPassword,
      "password2": confirmPassword,
    }
    
    const changePassword = axios
      .post("/api/users/password", body, config)
      .then(() => {
        callback(undefined);
      })
      .catch((error) => {
        callback(error);
      });
  }

  sendPayment(sentFrom, sentTo, amount, recipientName, callback) {
    console.log(this.JWTToken);
    
    const config = { headers: {
      "Content-Type": "application/json",
      "x-auth-token": this.JWTToken
    }
  }
    const body = {
      "sentFrom": sentFrom,
      "sentTo": sentTo,
      "Amount": amount,
    }
    
    const sendPayment = axios
      .post("/api/transactions", body, config)
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
            getPayees={this.getPayees}
            formatCurrency={this.formatCurrency}
          />
        ),
      };
    });
  }

  onPayments() {
    this.setState(() => {
      return {
        current_page: (
          <PaymentsPage
            getCurrentBalance={this.getCurrentBalance}
            currencyFormatter={this.formatCurrency}
            getPayees={this.getPayees}
            sendPayment={this.sendPayment}
          />
        ),
      };
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

  onPayees() {
    this.setState(() => {
      return {
        current_page: (
          <PayeesPage
            getPayees={this.getPayees}
            deletePayee={this.deletePayee}
            addPayee={this.addPayee}
          />
        ),
      };
    });
  }

  formatCurrency(amount) {
    const currencyFormatter = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    });

    return currencyFormatter.format(amount);
  }

  render() {
    return (
      <div className="fade-in container-fluid my-container vh-100">
        <div className="row">
          <div className="col">
            <AppNavbar
              onOverview={this.onOverview}
              onPayments={this.onPayments}
              onAccount={this.onAccount}
              onPayees={this.onPayees}
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
