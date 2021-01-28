import React, { Component } from "react";
import TransactionList from "./transaction-list.jsx";
import SpendingBar from "./spendingbar.jsx";
import DigitalCard from "./digital-card.jsx";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";

class OverviewPage extends Component {
  constructor(props) {
    super(props);

    this.getCurrentBalance = this.getCurrentBalance.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getCurrentBalance = this.getCurrentBalance.bind(this);

    this.state = {
      current_balance: 0,
      user_info: "",
    };
  }

  componentDidMount() {
    this.getUserInfo();
    this.getCurrentBalance();
  }

  getCurrentBalance() {
    this.props.getCurrentBalance((error, data) => {
      if (error) {
        return this.setState({ current_balance: 0 });
      }
      this.setState({
        current_balance: data.data.balance,
      });
    });
  }

  getUserInfo() {
    this.props.getUserInfo((error, data) => {
      if (error) {
        return this.setState({
          user_info: { title: "AuthError", firstname: "AuthError" },
        });
      }
      this.setState({ user_info: data.data });
    });
  }

  render() {
    return (
      <div className="fade-in">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-6 col-md-5 col-lg-3">
            <DigitalCard
              getDigitalCard={this.props.getDigitalCard}
              getUserInfo={this.props.getUserInfo}
              getCurrentBalance={this.props.getCurrentBalance}
            />
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
                {this.props.formatCurrency(this.state.current_balance)}
              </span>
              <br />
              <div className="row justify-content-center">
                <div className="col-10 col-sm-6 col-md-4 col-lg-2">
                  <span className="current-balance-title">Predicted Spend</span>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="top"
                    overlay={
                      <Popover id="popover-positioned-top">
                        <Popover.Title as="h3">
                          What is your predicted spend?
                        </Popover.Title>
                        <Popover.Content>
                          We use machine learning to predict the likelihood that
                          you will run out of money by the end of the month. Our
                          algorithm learns from your transaction history and
                          will become more accurate as you use your
                          <strong> Stubank©</strong> account.
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <Button
                      className="btn-sm"
                      variant="info"
                      style={{ marginLeft: "0.5em" }}
                    >
                      ?
                    </Button>
                  </OverlayTrigger>
                  <SpendingBar
                    currentBalance={this.state.current_balance}
                    getCurrentBalance={this.props.getCurrentBalance}
                    getPredictedSpending={this.props.getPredictedSpending}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="recent-payment-header">Transaction History</p>
            <TransactionList
              getTransactions={this.props.getTransactions}
              currencyFormatter={this.props.formatCurrency}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default OverviewPage;
