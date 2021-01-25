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
            <div className="transaction-container">
              <p>First Name: {this.props.userInfo.firstname}</p>
              <p>Last Name: {this.props.userInfo.lastname}</p>
              <p>Phone Number: {this.props.userInfo.phoneno}</p>
              <p>Date of Birth: {this.props.userInfo.dob}</p>
              <p>University: {this.props.userInfo.uni}</p>
              <p>Course Code: {this.props.userInfo.course}</p>
              <p>Postcode: {this.props.userInfo.postcode}</p>
              <p>City: {this.props.userInfo.city}</p>
              <p></p>
            </div>
          </div>

          <div className="col-md-6">
            <p className="recent-payment-header">Account Details</p>
            <div className="transaction-container"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountPage;
