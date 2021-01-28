import React, { Component } from "react";

class PaymentsPage extends Component {
  constructor(props) {
    super(props);

    this.getCurrentBalance = this.getCurrentBalance.bind(this);
    this.getPayees = this.getPayees.bind(this);
    this.onSubmitPayment = this.onSubmitPayment.bind(this);
    this.onChangeRecipient = this.onChangeRecipient.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);

    this.state = {
      payeesList: [],
      recipientID: "",
      recipientName: "",
      currentBalance: 0,
      amount: 0,
    };
  }

  componentDidMount() {
    this.getCurrentBalance();
    this.getPayees();
  }

  getCurrentBalance() {
    this.props.getCurrentBalance((error, data) => {
      if (error) {
        return this.setState({ currentBalance: 0 });
      }
      this.setState({ currentBalance: data.data.balance });
    });
  }

  getPayees() {
    this.props.getPayees((error, data) => {
      if (error) {
        return this.setState({
          payeesList: [
            {
              payeeName: "AuthError",
              payeeID: "AuthError",
              payeeEmail: "AuthError",
            },
          ],
        });
      }

      this.setState({ payeesList: data.data.payees });
      if (data.data.payees.length !== 0) {
        this.setState({ recipientID: data.data.payees[0].payeeID });
        this.setState({ recipientName: data.data.payees[0].payeeName });
      }
    });
  }

  onChangeRecipient(event) {
    this.setState({ recipientID: event.target.value.split("-")[0] });
    this.setState({ recipientName: event.target.value.split("-")[1] });
  }

  onChangeAmount(event) {
    this.setState({ amount: event.target.value });
  }

  onSubmitPayment(event) {
    event.preventDefault();
    this.props.sendPayment(
      "100" /* I don't know how to get sent from ID */,
      this.state.recipientID,
      this.state.currentBalanceamount,
      this.state.recipientName,
      (error) => {
        if (error) {
          return alert("Details incorrect.\nPayment Failed");
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
                                  value={payee.payeeID + "-" + payee.payeeName}
                                >
                                  {payee.payeeName + " " + payee.payeeID}
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
                            min="1"
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
      </div>
    );
  }
}

export default PaymentsPage;
