import React, { Component } from "react";
import TransactionList from "./transaction-list.jsx";
import TransfersList from "./transfers-list.jsx";

class OverviewPage extends Component {
  formatCurrency(amount) {
    const currencyFormatter = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    });

    return currencyFormatter.format(amount);
  }

  render() {
    return (
      <div className="fade-in">
        <div className="row justify-content-center">
          <div className="col">
            <div className="page-title">
              Welcome back, {this.props.userInfo.firstname}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <div className="page-title">
              <span className="current-balance-title">Current Balance</span>
              <br />
              <span className="current-balance-amount">
                {this.formatCurrency(this.props.accountInfo.current_balance)}
              </span>
              <br />
              <span className="current-balance-title">Savings Pots</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p className="recent-payment-header">Recent Transactions</p>
            <TransactionList
              getTransactions={this.props.getTransactions}
              currencyFormatter={this.formatCurrency}
            />
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
