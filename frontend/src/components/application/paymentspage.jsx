import React, { Component } from "react";
import TwoFAForm from "./2FAFormFraud.jsx";

class PaymentsPage extends Component {
  constructor(props) {
    super(props);

    this.getCurrentBalance = this.getCurrentBalance.bind(this);
    this.getPayees = this.getPayees.bind(this);
    this.onSubmitPayment = this.onSubmitPayment.bind(this);
    this.onChangeRecipient = this.onChangeRecipient.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);

    this.state = {
      payeesList: [],
      recipientID: "",
      recipientEmail: "",
      currentBalance: 0,
      amount: 0,
      user_info: "",
      fraudulent: false,

      userID: "",
      account: "",
      recipient: "",
      transaction: "",
    };
  }

  componentDidMount() {
    this.getCurrentBalance();
    this.getPayees();
    this.getUserInfo();
  }

  getCurrentBalance() {
    this.props.getCurrentBalance((error, data) => {
      if (error) {
        return this.setState({ currentBalance: 0 });
      }
      this.setState({ currentBalance: data.data.balance });
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

  getPayees() {
    this.props.getPayees((error, data) => {
      if (error) {
        return this.setState({
          payeesList: [
            {
              payeeID: "AuthError",
              payeeEmail: "AuthError",
            },
          ],
        });
      }

      this.setState({ payeesList: data.data.payees });
      if (data.data.payees.length !== 0) {
        this.setState({ recipientID: data.data.payees[0].payeeID });
        this.setState({ recipientEmail: data.data.payees[0].payeeEmail });
      }
    });
  }

  onChangeRecipient(event) {
    this.setState({ recipientID: event.target.value.split("-")[0] });
    this.setState({ recipientEmail: event.target.value.split("-")[1] });
  }

  onChangeAmount(event) {
    this.setState({ amount: event.target.value });
  }

  onSubmitPayment(event) {
    event.preventDefault();
    this.props.sendPayment(
      this.state.user_info.userId,
      this.state.recipientID,
      this.state.amount,
      (error, data) => {
        if (error) {
          return alert("Payment Failed");
        }
        if (data.data.account) {
          this.setState({ account: data.data.account });
          this.setState({ recipient: data.data.recipient });
          this.setState({ transaction: data.data.transaction });
          this.setState({ userID: data.data.transaction.userId });
          return this.setState({ fraudulent: true });
        }
        alert(
          `Payment to acccount ${this.state.recipientID} sent successfully.`
        );
        window.location.replace("/application");
      }
    );
  }

  render() {
    return (
      <div className="fade-in">
        <div className="row justify-content-center">
          <div className="col">
            <div className="page-title">Send a Payment</div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="recent-payment-header">
              Current Balance:
              {" " + this.props.currencyFormatter(this.state.currentBalance)}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div
              className="transaction-container"
              style={{ height: "75vh", padding: "1em" }}
            >
              <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 col-sm-10 col-md-6 col-lg-4">
                  <form onSubmit={this.onSubmitPayment}>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col">
                          <label htmlFor="payeeSelect">Select a Payee</label>
                          <select
                            className="form-control"
                            id="payeeSelect"
                            required={true}
                            onChange={this.onChangeRecipient}
                          >
                            {this.state.payeesList.map((payee, index) => {
                              return (
                                <option
                                  key={index}
                                  value={payee.payeeID + "-" + payee.payeeEmail}
                                >
                                  {payee.payeeEmail + " " + payee.payeeID}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col">
                          <label htmlFor="amount">Enter Amount to Send:</label>
                          <input
                            className="formControl"
                            id="amount"
                            type="number"
                            min="0.00"
                            step="0.01"
                            max={this.state.currentBalance}
                            required={true}
                            style={{ marginLeft: "1em" }}
                            onChange={this.onChangeAmount}
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col">
                          <input
                            type="submit"
                            value="Send Cash"
                            className="form-control btn-info btn-sm"
                          ></input>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.fraudulent && (
          <TwoFAForm
            account={this.state.account}
            recipient={this.state.recipient}
            transaction={this.state.transaction}
            userID={this.state.userID}
          />
        )}
      </div>
    );
  }
}

export default PaymentsPage;
