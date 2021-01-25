import React, { Component } from "react";

class AccountPage extends Component {
  render() {
    return (
      <div className="fade-in">
        <div className="row justify-content-center">
          <div className="col">
            <div className="page-title">Your Account</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p className="recent-payment-header">Personal Information</p>
            <div className="transaction-container">Hello</div>
          </div>

          <div className="col-md-6">
            <p className="recent-payment-header">Account Details</p>
            <div className="transaction-container">
              <p></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountPage;
