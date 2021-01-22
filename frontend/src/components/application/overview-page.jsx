import React, { Component } from "react";
import TransactionList from "./transaction-list.jsx";
import TransfersList from "./transfers-list.jsx";

class OverviewPage extends Component {
  constructor(props) {
    super(props);

    this.userInfo = this.getUserInfo();
  }

  getUserInfo() {
    return {
      first_name: "Oliver",
      current_balance: "549234393.32",
    };
  }

  formatCurrency(balance) {
    const currencyFormatter = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    });

    return currencyFormatter.format(balance);
  }

  render() {
    return (
      <div className="fade-in">
        <div className="row justify-content-center">
          <div className="col">
            <div className="page-title">
              Welcome back, {this.userInfo.first_name}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <div className="page-title">
              <span className="current-balance-title">Current Balance</span>
              <br />
              <span className="current-balance-amount">
                {this.formatCurrency(this.userInfo.current_balance)}
              </span>
              <br />
              <span className="current-balance-title">Savings Pots</span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <p className="recent-payment-header">Recent Transactions</p>
            <TransactionList />
          </div>
          <div className="col-md-6">
            <p className="recent-payment-header">Recent Transfers</p>
            <TransfersList />
          </div>
        </div>
      </div>
    );
  }
}

export default OverviewPage;
