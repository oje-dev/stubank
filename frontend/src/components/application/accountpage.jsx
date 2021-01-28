import React, { Component } from "react";

class AccountPage extends Component {
  constructor(props) {
    super(props);

    this.getAccountInfo = this.getAccountInfo.bind(this);

    this.state = {
      userInfo: {
        title: "Loading...",
        firstname: "Loading...",
        lastname: "Loading...",
        phoneno: "Loading...",
        dob: "Loading...",
        uni: "Loading...",
        course: "Loading...",
        address: "Loading...",
        city: "Loading...",
        postcode: "Loading...",
        email: "Loading...",
      },
    };
  }

  componentDidMount() {
    this.getAccountInfo();
  }

  formatDate(date) {
    const dateComponents = date.split("/");

    return dateComponents[2]
      .concat("/")
      .concat(dateComponents[1])
      .concat("/")
      .concat(dateComponents[0]);
  }

  getAccountInfo() {
    this.props.getUserInfo((error, data) => {
      if (error) {
        return this.setState({
          userInfo: {
            title: "AuthError",
            firstname: "AuthError",
            lastname: "AuthError",
            phoneno: "AuthError",
            dob: "AuthError",
            uni: "AuthError",
            course: "AuthError",
            address: "AuthError",
            city: "AuthError",
            postcode: "AuthError",
            email: "AuthError",
          },
        });
      }
      this.setState({ userInfo: data.data });
    });
  }

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
            <div className="transaction-container" style={{ padding: "1em" }}>
              <p>Title: {this.state.userInfo.title}</p>
              <p>First Name: {this.state.userInfo.firstname}</p>
              <p>Last Name: {this.state.userInfo.lastname}</p>
              <p>Phone Number: {this.state.userInfo.phoneno}</p>
              <p>Date of Birth: {this.state.userInfo.dob}</p>
              <p>University: {this.state.userInfo.uni}</p>
              <p>Course Code: {this.state.userInfo.course}</p>
              <p>Address: {this.state.userInfo.address}</p>
              <p>City: {this.state.userInfo.city}</p>
              <p>Postcode: {this.state.userInfo.postcode}</p>
            </div>
          </div>

          <div className="col-md-6">
            <p className="recent-payment-header">Account Details</p>
            <div className="transaction-container" style={{ padding: "1em" }}>
              <form onSubmit={this.onSubmit}>
                <p>Email Address: {this.state.userInfo.email}</p>
                <p>Change Password</p>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col">
                      <label htmlFor="currentPassword">Current Password</label>
                      <input
                        id="currentPassword"
                        type="password"
                        className="form-control form-control-lrg"
                        required={true}
                        placeholder="•••••••••••"
                        onChange={this.handleChangeCurrentPassword}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        id="newPassword"
                        type="password"
                        className="form-control form-control-lrg"
                        required={true}
                        placeholder="•••••••••••"
                        onChange={this.handleChangeNewPassword}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col">
                      <label htmlFor="newConfirmPassword">
                        Confirm Password
                      </label>
                      <input
                        id="newConfirmPassword"
                        type="password"
                        className="form-control form-control-lrg"
                        required={true}
                        placeholder="•••••••••••"
                        onChange={this.handleChangeNewConfirmPassword}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row justify-content-center">
                    <div className="col-6 col-md-4">
                      <input
                        type="submit"
                        value="Change Password"
                        className="form-control btn-success"
                      ></input>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountPage;
