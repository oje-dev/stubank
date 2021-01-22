import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../logo.png";

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.onOverview = this.onOverview.bind(this);
    this.onSpending = this.onSpending.bind(this);
    this.onSavingsPot = this.onSavingsPot.bind(this);
    this.onPayments = this.onPayments.bind(this);
    this.onHelp = this.onHelp.bind(this);
    this.onAccount = this.onAccount.bind(this);
  }

  onOverview() {
    this.props.onOverview();
  }

  onSpending() {
    this.props.onSpending();
  }

  onSavingsPot() {
    this.props.onSavingsPot();
  }

  onPayments() {
    this.props.onPayments();
  }

  onHelp() {
    this.props.onHelp();
  }

  onAccount() {
    this.props.onAccount();
  }

  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="shadow-lg rounded"
      >
        <Navbar.Brand href="/">
          <img
            src={Logo}
            alt=""
            className="d-inline-block align-top"
            height="auto"
            width="150"
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={this.onOverview}>Overview</Nav.Link>
            <Nav.Link onClick={this.onSpending}>Spending</Nav.Link>
            <NavDropdown title="Savings Pots" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={this.onSavingsPot}>
                Open Pot
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.onSavingsPot}>
                Your Pots
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Payments" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={this.onPayments}>
                Send a Payment
              </NavDropdown.Item>
              <NavDropdown.Item onClick={this.onPayments}>
                Request a Payment
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.onPayments}>
                View Payments
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title="Account Details" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={this.onAccount}>View</NavDropdown.Item>
              <NavDropdown.Item onClick={this.onHelp}>Help</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.onAccount}>
                Change Password
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default AppNavbar;
