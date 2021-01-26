import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";

class InvalidAuth extends Component {
  render() {
    return (
      <div className="auth-alert">
        <div className="container vh-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col">
              <Alert variant="danger" className="auth-alert-message">
                <Alert.Heading>You are not logged in</Alert.Heading>
                <p>Your authorisation token has expired.</p>
                <hr />
                <p className="mb-0">
                  Please <Alert.Link href="/">click here</Alert.Link> to return
                  to the landing page and login again.
                </p>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InvalidAuth;
