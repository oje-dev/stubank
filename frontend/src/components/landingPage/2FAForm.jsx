import React, { Component } from "react";

class TwoFAForm extends Component {
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
            <form>
              <div className="form-group">
                <div className="form-row">
                  <div className="col ">
                    <input
                      type="text"
                      className="form-control form-control-sm"
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
