import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../logo.png";

class DigitalCard extends React.Component {
  getCardDetails() {
    const cardDetails = {
      title: "Mr.",
      name: "Oliver El-kheir",
    };
  }

  render() {
    return (
      <div>
        <Card
          style={{
            width: "100%",
            backgroundColor: "rgba(43, 160, 228, 0.9)",
            marginTop: "1rem",
            borderRadius: "1rem",
          }}
        >
          <Card.Body style={{ color: "white" }}>
            <img src={logo} alt="logo" style={{ float: "right" }} />
            <div style={{ textAlign: "left" }}>
              <Card.Title style={({ clear: "right" }, { marginTop: "3rem" })}>
                Mr Olly Elkheir
              </Card.Title>
              <Card.Text>
                <span style={{ fontSize: "1rem" }}>1234 5678 1234 5678</span>
              </Card.Text>
              <Row>
                <Col>
                  <Card.Text>
                    <span style={{ textAlign: "left" }}>21-01-12</span>
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    <span style={{ textAlign: "right" }}>12345678</span>
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
