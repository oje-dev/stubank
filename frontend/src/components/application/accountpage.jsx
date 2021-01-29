import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class AccountPage extends Component {
  constructor(props) {
    super(props);

    this.getAccountInfo = this.getAccountInfo.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(
      this
    );
    this.handleChangeCurrentPassword = this.handleChangeCurrentPassword.bind(
      this
    );
    this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);

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
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  componentDidMount() {
    this.getAccountInfo();
  }

  formatDate(date) {
    if (date === "Loading...") {
      return date;
    }
    const dateComponents = date.split("-");

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

  onChangePassword(event) {
    event.preventDefault();
    console.log(
      "Current Password " + this.state.currentPassword + "\n",
      "New Password: " + this.state.newPassword + "\n",
      "Confirm Password: " + this.state.confirmPassword
    );
    if (this.state.newPassword !== this.state.confirmPassword) {
      return alert("Passwords do not match");
    }
    this.props.changePassword(
      this.state.newPassword,
      this.state.confirmPassword,
      this.state.currentPassword,
      this.state.userInfo.email,
      (error) => {
        if (error) {
          return alert("Your current password is incorrect.");
        }
        alert("Successfully changed password\nPlease login again");
        sessionStorage.removeItem("x-auth-token");
        window.location.replace("/");
      }
    );
  }

  handleChangeCurrentPassword(event) {
    this.setState({ currentPassword: event.target.value });
  }

  handleChangeNewPassword(event) {
    this.setState({ newPassword: event.target.value });
  }

  handleChangeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
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
            <div
              className="transaction-container"
              style={{ padding: "1em", height: "65vh" }}
            >
              <Table>
                <tbody>
                  <tr>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        Title
                      </span>
                    </td>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        {this.state.userInfo.title}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        First Name
                      </span>
                    </td>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        {this.state.userInfo.firstname}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        Last Name
                      </span>
                    </td>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        {this.state.userInfo.lastname}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        Phone Number
                      </span>
                    </td>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        {this.state.userInfo.phoneno}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        Date of Birth
                      </span>
                    </td>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        {this.formatDate(this.state.userInfo.dob)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        University
                      </span>
                    </td>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        {this.state.userInfo.uni}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        Course Code
                      </span>
                    </td>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        {this.state.userInfo.course}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        Address
                      </span>
                    </td>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        {this.state.userInfo.address}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        City
                      </span>
                    </td>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        {this.state.userInfo.city}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        Postcode
                      </span>
                    </td>
                    <td>
                      <span
                        className="recent-payment-header"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        {this.state.userInfo.postcode}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="col-md-6">
            <p className="recent-payment-header">Account Details</p>
            <div
              className="transaction-container container"
              style={{ padding: "1em", height: "65vh" }}
            >
              <div style={{ marginBottom: "4em" }}>
                <span
                  className="recent-payment-header"
                  style={{ fontSize: "1.2em", color: "black" }}
                >
                  Your Email Address: {this.state.userInfo.email}
                </span>
              </div>
              <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-6">
                  <form onSubmit={this.onChangePassword}>
                    <div
                      className="text-center"
                      style={{ marginBottom: "1em" }}
                    >
                      <span
                        className="recent-payment-header"
                        style={{ fontSize: "1.2em", color: "black" }}
                      >
                        Change Password
                      </span>
                    </div>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col">
                          <label htmlFor="currentPassword">
                            Current Password
                          </label>
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
                            onChange={this.handleChangeConfirmPassword}
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-row justify-content-center">
                        <div className="col-6 col-md-5">
                          <input
                            type="submit"
                            value="Change Password"
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

export default AccountPage;
