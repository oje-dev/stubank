import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../logo.png";

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.onOverview = this.onOverview.bind(this);
    this.onPayments = this.onPayments.bind(this);
    this.onAccount = this.onAccount.bind(this);
    this.onPayees = this.onPayees.bind(this);
  }

  onOverview() {
    this.props.onOverview();
  }

  onPayments() {
    this.props.onPayments();
  }

  onAccount() {
    this.props.onAccount();
  }

  onPayees() {
    this.props.onPayees();
  }

  onLogout() {
    sessionStorage.removeItem("x-auth-token");
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
        <Navbar.Brand href="/application">
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
            <NavDropdown title="Payments" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={this.onPayees}>
                Your Payees
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.onPayments}>
                Send a Payment
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link onClick={this.onAccount}>Your Account</Nav.Link>

            <Nav.Link onClick={this.onLogout} href="/">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default AppNavbar;
