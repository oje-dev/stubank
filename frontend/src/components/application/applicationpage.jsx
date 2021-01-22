import React, { Component } from "react";
import AppNavbar from "./app-navbar.jsx";
import OverviewPage from "./overview-page.jsx";
import SpendingPage from "./spendingpage.jsx";
import SavingsPage from "./savingspage.jsx";
import PaymentsPage from "./paymentspage.jsx";
import AccountPage from "./accountpage.jsx";
import HelpPage from "./helppage.jsx";

class ApplicationPage extends Component {
  constructor(props) {
    super(props);

    this.onOverview = this.onOverview.bind(this);
    this.onSpending = this.onSpending.bind(this);
    this.onSavingsPot = this.onSavingsPot.bind(this);
    this.onPayments = this.onPayments.bind(this);
    this.onAccount = this.onAccount.bind(this);
    this.onHelp = this.onHelp.bind(this);

    this.state = { current_page: <OverviewPage /> };
  }

  onOverview() {
    this.setState(() => {
      return { current_page: <OverviewPage /> };
    });
  }

  onSpending() {
    this.setState(() => {
      return { current_page: <SpendingPage /> };
    });
  }

  onSavingsPot() {
    this.setState(() => {
      return { current_page: <SavingsPage /> };
    });
  }

  onPayments() {
    this.setState(() => {
      return { current_page: <PaymentsPage /> };
    });
  }

  onHelp() {
    this.setState(() => {
      return { current_page: <HelpPage /> };
    });
  }

  onAccount() {
    this.setState(() => {
      return { current_page: <AccountPage /> };
    });
  }

  render() {
    return (
      <div>
        <div className="fade-in container-fluid my-container vh-100">
          <div className="row">
            <div className="col">
              <AppNavbar
                onOverview={this.onOverview}
                onSpending={this.onSpending}
                onSavingsPot={this.onSavingsPot}
                onPayments={this.onPayments}
                onHelp={this.onHelp}
                onAccount={this.onAccount}
              />
            </div>
          </div>

          {this.state.current_page}
        </div>
      </div>
    );
  }
}

export default ApplicationPage;
