import React, { Component } from "react";
import axios from "axios";

class TwoFAForm extends Component {
  constructor(props) {
    super(props);

    this.userID = this.props.userID;

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeOTP = this.onChangeOTP.bind(this);
    this.sendRequest = this.sendRequest.bind(this);

    this.state = { otp: "", userID: this.userID };
  }

  onSubmit(e) {
    e.preventDefault();
    this.sendRequest((error, data) => {
      if (error) {
        return alert("Incorrect Code");
      }
      sessionStorage.setItem("x-auth-token", data.token);
      window.location.replace("/application");
    });
  }

  onChangeOTP(e) {
    this.setState({ otp: e.target.value });
  }
  sendRequest(callback) {
    axios
      .post("/api/auth/otp", this.state, {
        headers: { "content-type": "application/json" },
        body: { userID: this.state.userID, otp: this.state.otp },
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
      <div className="fade-in container-fluid ">
        <div className="row justify-content-center ">
          <div className="col text-center twofaText ">
            Please enter the authentication code sent to your email address
          </div>
        </div>
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
                    <input type="submit" className="btn-success btn-sm"></input>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TwoFAForm;
