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

    this.state = {
      current_page: (
        <OverviewPage
          accountInfo={this.getAccountInfo()}
          transactionInfo={this.getTransactions()}
        />
      ),
    };
  }

  getUserInfo() {
    return {
      title: "Mr.",
      firstname: "Oliver",
      lastname: "El-kheir",
      phoneno: "+447447800084",
      dob: "01/10/1997",
      uni: "Newcastle University",
      course: "G600",
      address: "19 Cavendish Place, Jesmond",
      city: "Newcastle-upon-Tyne",
      postcode: "NE2 2NE",
      email: "o.elkheir1@newcastle.ac.uk",
    };
  }

  getAccountInfo() {
    return { current_balance: "1232.23" };
  }

  getTransactions() {
    return [
      {
        merchant_id: "100",
        merchant_name: "Barclays",
        amount: "23.75",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "200",
        merchant_name: "Tesco",
        amount: "50.21",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "400",
        merchant_name: "Gregg's",
        amount: "100.21",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
    ];
  }

  onOverview() {
    this.setState(() => {
      return {
        current_page: (
          <OverviewPage
            accountInfo={this.getAccountInfo()}
            transactionInfo={this.getTransactions()}
          />
        ),
      };
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
