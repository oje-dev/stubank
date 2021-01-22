import React from "react";

export default class CreateAccountForm extends React.Component {
  render() {
    return (
      <div class="createAccountForm fade-in">
        <form>
          {/* Title */}

          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="title">Title*</label>
                <select id="title" className="form-control form-control-sm">
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
                  required="true"
                ></input>
              </div>
              <div className="col">
                <label htmlFor="last_name">Last Name*</label>
                <input
                  id="last_name"
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Smith"
                  required="true"
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
                  required="true"
                  className="form-control form-control-sm"
                  placeholder="+44-7447-777777"
                ></input>
              </div>
              <div className="col">
                <label htmlFor="date_of_birth">Date of Birth*</label>
                <input
                  id="date_of_birth"
                  type="date"
                  required="true"
                  className="form-control form-control-sm"
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
                  required="true"
                  className="form-control form-control-sm"
                  placeholder="Newcastle University"
                ></input>
              </div>
              <div className="col">
                <label htmlFor="course_code">Course Code</label>
                <input
                  id="course_code"
                  type="text"
                  required="true"
                  className="form-control form-control-sm"
                  placeholder="G600"
                ></input>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="curr_year">Current Year*</label>
              </div>
            </div>

            <div className="form-row">
              <div className="col">
                {" "}
                <div className="form-check form-check-inline">
                  <input
                    id="year_1"
                    type="radio"
                    name="curr_year"
                    required="true"
                    className="form-check-input"
                  ></input>
                  <label htmlFor="year_1" className="form-check-label">
                    1st
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    id="year_2"
                    type="radio"
                    name="curr_year"
                    required="true"
                    className="form-check-input"
                  ></input>
                  <label htmlFor="year_2" className="form-check-label">
                    2nd
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    id="year_3"
                    type="radio"
                    name="curr_year"
                    required="true"
                    className="form-check-input"
                  ></input>
                  <label htmlFor="year_3" className="form-check-label">
                    3rd
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    id="year_4"
                    type="radio"
                    name="curr_year"
                    required="true"
                    className="form-check-input"
                  ></input>
                  <label htmlFor="year_4" className="form-check-label">
                    4th+
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="address_1">Address 1*</label>
                <input
                  type="text"
                  name="address_1"
                  required="true"
                  placeholder="House Name/No"
                  className="form-control form-control-sm"
                ></input>
              </div>
              <div className="col">
                <label htmlFor="address_2">Address 2*</label>
                <input
                  type="text"
                  name="address_2"
                  required="true"
                  className="form-control form-control-sm"
                  placeholder="Street Name"
                ></input>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="address_3">Address 3</label>
                <input
                  type="text"
                  name="address_3"
                  className="form-control form-control-sm"
                  placeholder="Other"
                ></input>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="address_county">County*</label>
                <input
                  type="text"
                  name="address_county"
                  required="true"
                  className="form-control form-control-sm"
                  placeholder="Tyne and Wear"
                ></input>
              </div>
              <div className="col">
                <label htmlFor="address_postcode">Postcode*</label>
                <input
                  type="text"
                  name="address_postcode"
                  required="true"
                  className="form-control form-control-sm"
                  placeholder="NE1 1NE"
                ></input>
              </div>
            </div>
          </div>

          {/* Email/Password */}
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="email_address">Email Address: </label>
                <input
                  type="email"
                  name="email_address"
                  required="true"
                  className="form-control form-control-sm"
                  placeholder="someone@example.com"
                ></input>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  name="password"
                  required="true"
                  className="form-control form-control-sm"
                  placeholder="•••••••••••"
                ></input>
              </div>
              <div className="col">
                <label htmlFor="confirm_password">Confirm Password: </label>
                <input
                  type="password"
                  name="confirm_password"
                  required="true"
                  className="form-control form-control-sm"
                  placeholder="•••••••••••"
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
                  className="form-control btn-success btn-sm"
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
  }
}
