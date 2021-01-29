import React, { Component } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

class TwoFAForm extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeOTP = this.onChangeOTP.bind(this);
    this.sendRequest = this.sendRequest.bind(this);

    this.state = { otp: "" };
  }
/**if otp correct send payment through */
  onSubmit(e) {
    e.preventDefault();
    this.sendRequest((error, data) => {
      if (error) {
        return alert("Incorrect Code");
      }
      alert("Payment Successful!")
      window.location.replace("/application");
    });
  }

  onChangeOTP(e) {
    this.setState({ otp: e.target.value });
  }
/**sends otp to backend along with transaction data*/
  sendRequest(callback) {
    axios
      .post("/api/transactions/otp",  {
        headers: {
          "Content-Type": "application/json"
        },
        data: {otp: this.state.otp,
          userId: this.props.userID,
          recipient: this.props.recipient,
          account: this.props.account,
          transaction: this.props.transaction,},
      })
      .then((response) => {
        if (response.data.errors) {
          throw response.data.errors;
        }
        callback(undefined, response.data);
      })
      .catch((error) => {
        callback(error, undefined);
      });
  }

  render() {
    return (
      <div className="auth-alert">
        <div className="container vh-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col">
              <Alert variant="info" className="auth-alert-message">
                <Alert.Heading>Fraud Prevention</Alert.Heading>
                <hr />
                <p>
                  Please enter the one-time password sent to your email address
                  to verify the transfer.
                </p>
                <div className="fade-in container-fluid ">
                  <div className="row justify-content-center "></div>
                  <div className="row justify-content-center">
                    <div className="col text-right ">
                      <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <div className="form-row">
                            <div className="col ">
                              <input
                                type="text"
                                className="form-control form-control-sm otp-input"
                                required={true}
                                onChange={this.onChangeOTP}
                                maxLength="6"
                              ></input>
                            </div>
                            <div className="col-2 ">
                              <input
                                type="submit"
                                className="btn-info btn-sm"
                              ></input>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TwoFAForm;
