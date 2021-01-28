import React, { Component } from "react";

class NotFoundPage extends Component {
  render() {
    return (
      <div
        className="row  justify-content-center align-items-center"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div className="col-6 text-center align-items-center">
          <div
            className="transaction-container"
            style={{ height: "40vh", width: "50vw", padding: "1em" }}
          >
            <div className="row h-100 align-items-center">
              <div className="col mx-auto">
                <p
                  className="recent-payment-header text-center"
                  style={{ fontSize: "1.5em", color: "black" }}
                >
                  Uh oh! This page does not exist, please click{" "}
                  <a href="/">here</a> to go back.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
