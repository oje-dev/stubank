import React, { Component } from "react";

class PayeesPage extends Component {
  constructor(props) {
    super(props);

    this.handleChangeAddPayee = this.handleChangeAddPayee.bind(this);
    this.handleChangeDeletePayee = this.handleChangeDeletePayee.bind(this);
    this.onAddPayee = this.onAddPayee.bind(this);
    this.onDeletePayee = this.onDeletePayee.bind(this);
    this.getPayees = this.getPayees.bind(this);

    this.state = {
      payeeList: [],
      addPayee: "",
      deletePayee: "",
    };
  }

  componentDidMount() {
    this.getPayees();
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
      this.setState({ payeeList: data.data.payees });
    });
  }

  handleChangeAddPayee(event) {
    this.setState({ addPayee: event.target.value });
  }

  onAddPayee(event) {
    event.preventDefault();
    this.props.addPayee(this.state.addPayee, (error) => {
      if (error) {
        return alert(
          `The user with email address "${this.state.addPayee}" Either does not exist, is yourself or is already one of your payees.`
        );
      }
      alert("Payee Added Successfully");
      this.getPayees();
    });
  }

  handleChangeDeletePayee(event) {
    this.setState({ deletePayee: event.target.value });
  }

  onDeletePayee(event) {
    event.preventDefault();
    this.props.deletePayee(this.state.deletePayee, (error) => {
      if (error) {
        return alert(
          `You have no payees with id "${this.state.deletePayee}"`
        );
      }
      alert("Payee Deleted Successfully");
      this.getPayees();
    });
  }

  render() {
    return (
      <div className="fade-in">
        <div className="row justify-content-center">
          <div className="col">
            <div className="page-title">Manage your Payees</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p className="recent-payment-header">Your Payees</p>
            <div
              className="transaction-container"
              style={{ padding: "0.5em", height: "75vh" }}
            >
              <div className="row" style={{ marginBottom: "1em" }}>
                <div
                  className="col text-center recent-payment-header"
                  style={{
                    color: "black",
                    marginTop: "0.5em",
                    fontSize: "0.9em",
                  }}
                >
                  Payee ID
                </div>
                <div
                  className="col text-center recent-payment-header"
                  style={{
                    color: "black",
                    marginTop: "0.5em",
                    fontSize: "0.9em",
                  }}
                >
                  Email Address
                </div>
              </div>
              {this.state.payeeList.map((payee, index) => {
                return (
                  <div key={index} className="row">
                    <div
                      className="col text-center"
                      style={{ fontSize: "0.8em" }}
                    >
                      {payee.payeeID}
                    </div>
                    <div
                      className="col text-center"
                      style={{ fontSize: "0.8em" }}
                    >
                      {payee.payeeEmail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-6">
            <p className="recent-payment-header">Add or Remove a Payee</p>
            <div className="transaction-container" style={{ height: "75vh" }}>
              <div className="row justify-content-center align-items-center h-50">
                <div className="col-11 col-sm-10 col-md-6 text-center">
                  <form onSubmit={this.onAddPayee}>
                    <p
                      className="recent-payment-header"
                      style={{
                        color: "black",
                        fontSize: "1.5em",
                        marginTop: "0",
                      }}
                    >
                      Add a New Payee
                    </p>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col">
                          <input
                            id="addPayeeField"
                            type="email"
                            className="form-control form-control-sm"
                            required={true}
                            placeholder="someone@example.com"
                            onChange={this.handleChangeAddPayee}
                          ></input>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-row justify-content-center">
                        <div className="col-6 col-md-5">
                          <input
                            type="submit"
                            value="Add"
                            className="form-control btn-info"
                          ></input>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row justify-content-center align-items-center h-50">
                <div className="col-11 col-sm-10 col-md-6 text-center">
                  <form onSubmit={this.onDeletePayee}>
                    <p
                      className="recent-payment-header"
                      style={{
                        color: "black",
                        fontSize: "1.5em",
                        marginTop: "0",
                      }}
                    >
                      Delete a Payee
                    </p>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col">
                          <input
                            id="deletePayeeField"
                            type="text"
                            className="form-control form-control-sm"
                            required={true}
                            placeholder="928374653"
                            onChange={this.handleChangeDeletePayee}
                          ></input>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-row justify-content-center">
                        <div className="col-6 col-md-5">
                          <input
                            type="submit"
                            value="Delete"
                            className="form-control btn-info"
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

export default PayeesPage;
