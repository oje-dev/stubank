import axios from "axios";
import React, { Component } from "react";
import TwoFAForm from "./2FAForm.jsx";

class CreateAccountForm extends Component {
  constructor(props) {
    super(props);

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    this.handleChangeDoB = this.handleChangeDoB.bind(this);
    this.handleChangeUniversity = this.handleChangeUniversity.bind(this);
    this.handleChangeCourse = this.handleChangeCourse.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangePostCode = this.handleChangePostCode.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(
      this
    );

    this.onSubmit = this.onSubmit.bind(this);
    this.sendRequest = this.sendRequest.bind(this);

    this.createAccountForm = (
      <div className="createAccountForm fade-in">
        <form onSubmit={this.onSubmit}>
          {/* Title */}

          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="title">Title*</label>
                <select
                  id="title"
                  className="form-control form-control-sm"
                  onChange={this.handleChangeTitle}
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>
            </div>
          </div>

          {/* First/Last Name */}
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="first_name">First Name*</label>
                <input
                  id="first_name"
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="John"
                  required={true}
                  onChange={this.handleChangeFirstName}
                ></input>
              </div>
              <div className="col">
                <label htmlFor="last_name">Last Name*</label>
                <input
                  id="last_name"
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Smith"
                  required={true}
                  onChange={this.handleChangeLastName}
                ></input>
              </div>
            </div>
          </div>

          {/* General Information */}
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="phone_number">Phone Number*</label>
                <input
                  id="phone_number"
                  type="text"
                  required={true}
                  className="form-control form-control-sm"
                  placeholder="+44-7447-777777"
                  onChange={this.handleChangePhoneNumber}
                ></input>
              </div>
              <div className="col">
                <label htmlFor="date_of_birth">Date of Birth*</label>
                <input
                  id="date_of_birth"
                  type="date"
                  required={true}
                  className="form-control form-control-sm"
                  onChange={this.handleChangeDoB}
                ></input>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="curr_university">Current University*</label>
                <input
                  id="curr_university"
                  type="text"
                  required={true}
                  className="form-control form-control-sm"
                  placeholder="Newcastle University"
                  onChange={this.handleChangeUniversity}
                ></input>
              </div>
              <div className="col">
                <label htmlFor="course_code">Course Code</label>
                <input
                  id="course_code"
                  type="text"
                  required={true}
                  className="form-control form-control-sm"
                  placeholder="G600"
                  onChange={this.handleChangeCourse}
                ></input>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="address">Address*</label>
                <input
                  id="address"
                  type="text"
                  required={true}
                  placeholder="Your Address"
                  className="form-control form-control-sm"
                  onChange={this.handleChangeAddress}
                ></input>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="address_city">City*</label>
                <input
                  type="text"
                  id="address_city"
                  required={true}
                  className="form-control form-control-sm"
                  placeholder="Newcastle-upon-Tyne"
                  onChange={this.handleChangeCity}
                ></input>
              </div>
              <div className="col">
                <label htmlFor="address_postcode">Postcode*</label>
                <input
                  type="text"
                  name="address_postcode"
                  required={true}
                  className="form-control form-control-sm"
                  placeholder="NE1 1NE"
                  onChange={this.handleChangePostCode}
                ></input>
              </div>
            </div>
          </div>

          {/* Email/Password */}
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="email_address">Email Address</label>
                <input
                  type="email"
                  name="email_address"
                  required={true}
                  className="form-control form-control-sm"
                  placeholder="someone@example.com"
                  onChange={this.handleChangeEmail}
                ></input>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  required={true}
                  className="form-control form-control-sm"
                  placeholder="•••••••••••"
                  onChange={this.handleChangePassword}
                ></input>
              </div>
              <div className="col">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  type="password"
                  name="confirm_password"
                  required={true}
                  className="form-control form-control-sm"
                  placeholder="•••••••••••"
                  onChange={this.handleChangeConfirmPassword}
                ></input>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="form-group">
            <div className="form-row align-items-center justify-content-between">
              <div className="col-4">
                <input
                  type="submit"
                  value="Signup"
                  className="form-control btn-info btn-sm"
                ></input>
              </div>
              <div className="col-8 text-right">
                <small className="form-text">
                  Already have an account? <a href="/">Click here</a> to sign
                  in.
                </small>
              </div>
            </div>
          </div>
        </form>
      </div>
    );

    this.state = {
      title: "Mr.",
      firstname: "",
      lastname: "",
      phoneno: "",
      dob: "",
      uni: "",
      course: "",
      address: "",
      city: "",
      postcode: "",
      email: "",
      newPassword: "",
      password2: "",
      form: this.createAccountForm,
    };
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleChangeFirstName(event) {
    this.setState({ firstname: event.target.value });
  }

  handleChangeLastName(event) {
    this.setState({ lastname: event.target.value });
  }

  handleChangePhoneNumber(event) {
    this.setState({ phoneno: event.target.value });
  }

  handleChangeDoB(event) {
    this.setState({ dob: event.target.value });
  }

  handleChangeUniversity(event) {
    this.setState({ uni: event.target.value });
  }

  handleChangeCourse(event) {
    this.setState({ course: event.target.value });
  }

  handleChangeAddress(event) {
    this.setState({ address: event.target.value });
  }

  handleChangeCity(event) {
    this.setState({ city: event.target.value });
  }

  handleChangePostCode(event) {
    this.setState({ postcode: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({
      newPassword: event.target.value,
    });
  }

  handleChangeConfirmPassword(event) {
    this.setState({ password2: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.newPassword !== this.state.password2) {
      return alert("Passwords do not match");
    }
    this.sendRequest((error, data) => {
      if (error) {
        let errorMessage = "";
        error.forEach((error) => {
          errorMessage += error.msg + "\n";
        });
        return alert(errorMessage);
      }
      this.setState({ form: <TwoFAForm userID={data} /> });
    });
  }
  sendRequest(callback) {
    axios
      .post("/api/users", this.state, {
        headers: { "content-type": "application/json" },
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
    return <div>{this.state.form}</div>;
  }
}

export default CreateAccountForm;
