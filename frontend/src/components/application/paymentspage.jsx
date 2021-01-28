import React, { Component } from "react";
import PayeesPage from "./payeespage.jsx";

class PaymentsPage extends Component {
  render() {
    return (
      <div className="fade-in">
        <div className="row justify-content-center">
          <div className="col">
            <div className="page-title">Payments</div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <PayeesPage />
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentsPage;
