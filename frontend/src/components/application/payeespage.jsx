import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Payees extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col
            cs={12}
            md={6}
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          >
            <p className="recent-payment-header">Your Payees</p>
            <div
              className="transaction-container"
              style={{ padding: "0.8rem", fontSize: "0.8rem", height: "70vh" }}
            >
              <Row>
                <Col>
                  <p
                    className="recent-payment-header"
                    style={{
                      color: "black",
                      fontSize: "1.5em",
                      marginTop: "0",
                    }}
                  >
                    Payee Name
                  </p>
                </Col>
                <Col>
                  <p
                    className="recent-payment-header"
                    style={{
                      color: "black",
                      fontSize: "1.5em",
                      marginTop: "0",
                    }}
                  >
                    Payee ID
                  </p>
                </Col>
                <Col>
                  <p
                    className="recent-payment-header"
                    style={{
                      color: "black",
                      fontSize: "1.5em",
                      marginTop: "0",
                    }}
                  >
                    Email Address
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>Bob Mortimer</span>
                </Col>
                <Col>
                  <span>1851515151</span>
                </Col>
                <Col>
                  <span>Email@Email.com</span>
                </Col>
              </Row>
            </div>
          </Col>
          <Col
            className=""
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          >
            <p className="recent-payment-header">Add/Remove Payees</p>
            <div
              className="transaction-container"
              style={{ overflow: "hidden", height: "70vh" }}
            >
              <Row>
                <Col style={{ borderBottom: "1px solid " }}>
                  <div>
                    <p
                      className="recent-payment-header"
                      style={{
                        textAlign: "center",
                        marginTop: "1em",
                        fontSize: "1.2em",
                        color: "black",
                      }}
                    >
                      Add a New Payee
                    </p>
                    <Form>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Control
                            type="email"
                            placeholder="someone@example.com"
                          />
                        </Form.Group>
                      </Form.Row>
                      <Button
                        variant="primary"
                        type="submit"
                        style={{ float: "right" }}
                      >
                        Add
                      </Button>
                    </Form>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>
                    <p
                      className="recent-payment-header"
                      style={{
                        textAlign: "center",
                        fontSize: "1.2em",
                        color: "black",
                        marginTop: "1em",
                      }}
                    >
                      Delete a Payee
                    </p>
                    <Form>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Control
                            as="select"
                            defaultValue="No Payees Yet"
                          >
                            <option value="" disabled hidden>
                              No Payees Yet
                            </option>
                          </Form.Control>
                        </Form.Group>
                      </Form.Row>
                      <Button
                        variant="primary"
                        type="submit"
                        style={{ float: "right" }}
                      >
                        Delete
                      </Button>
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Payees;
