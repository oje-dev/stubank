import React, { Component } from "react";
import TransactionList from "./transaction-list.jsx";
import TransfersList from "./transfers-list.jsx";
import SpendingBar from "./spendingbar.jsx";
import DigitalCard from "./digital-card.jsx";

class OverviewPage extends Component {
  constructor(props) {
    super(props);

    this.getCurrentBalance = this.getCurrentBalance.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getCurrentBalance = this.getCurrentBalance.bind(this);

    this.state = {
      current_balance: this.formatCurrency(0),
      user_info: "",
    };
  }

  componentDidMount() {
    this.getUserInfo();
    this.getCurrentBalance();
  }

  getCurrentBalance() {
    this.props.accountInfo((error, data) => {
      if (error) {
        return this.setState({ current_balance: this.formatCurrency(0) });
      }
      this.setState({
        current_balance: this.formatCurrency(data.data.balance),
      });
    });
  }

  getUserInfo() {
    this.props.userInfo((error, data) => {
      if (error) {
        return this.setState({
          user_info: { title: "AuthError", firstname: "AuthError" },
        });
      }
      this.setState({ user_info: data.data });
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
      <div className="fade-in">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-6 col-md-5 col-lg-3">
            <DigitalCard />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col">
            <div className="page-title">
              Welcome back, {this.state.user_info.firstname}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <div className="page-title">
              <span className="current-balance-title">Current Balance</span>
              <br />
              <span className="current-balance-amount">
                {this.state.current_balance}
              </span>
              <br />
              <div className="row justify-content-center">
                <div className="col-10 col-sm-6 col-md-4 col-lg-2">
                  <SpendingBar />
                </div>
              </div>
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
