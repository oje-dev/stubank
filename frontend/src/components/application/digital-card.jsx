import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../logo.png";

class DigitalCard extends React.Component {
  constructor(props) {
    super(props);

    this.getCardDetails = this.getCardDetails.bind(this);

    this.state = {
      name: "Loading...",
      cardNumber: "Loading...",
      accountNumber: "Loading...",
    };
  }

  componentDidMount() {
    this.getCardDetails();
    this.getUserDetails();
  }

  formatCardNumber(cardNumber) {
    let formattedNumber = cardNumber.match(/.{1,4}/g);
    return formattedNumber.join(" ");
  }

  getCardDetails() {
    this.props.getDigitalCard((error, data) => {
      if (error) {
        return this.setState({
          cardNumber: "AuthError",
          accountNumber: "AuthError",
        });
      }
      this.setState({
        cardNumber: this.formatCardNumber(data.cardNumber),
        accountNumber: data.accountNumber,
      });
    });
  }

  getUserDetails() {
    this.props.userInfo((error, data) => {
      if (error) {
        return this.setState({ name: "AuthError" });
      }
      this.setState({
        name:
          data.data.title +
          " " +
          data.data.firstname +
          " " +
          data.data.lastname,
      });
    });
  }

  render() {
    return (
      <div>
        <Card
          style={{
            width: "100%",
            backgroundColor: "rgba(43, 160, 228, 1)",
            marginTop: "1rem",
            borderRadius: "1rem",
          }}
        >
          <Card.Body style={{ color: "white" }}>
            <img src={logo} alt="logo" style={{ float: "right" }} />
            <div style={{ textAlign: "left" }}>
              <Card.Title style={({ clear: "right" }, { marginTop: "3rem" })}>
                {this.state.name}
              </Card.Title>
              <Card.Text style={{ textAlign: "center" }}>
                <span style={{ fontSize: "1.5rem" }}>
                  {this.state.cardNumber}
                </span>
              </Card.Text>
              <Row>
                <Col>
                  <Card.Text>
                    <span style={{ textAlign: "left" }}>21-01-12</span>
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    <span style={{ textAlign: "right" }}>
                      {this.state.accountNumber}
                    </span>
                  </Card.Text>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default DigitalCard;
