import React, { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

class SpendingBar extends Component {
  constructor(props) {
    super(props);

    this.getCurrentBalance = this.getCurrentBalance.bind(this);
    this.getPredictedSpending = this.getPredictedSpending.bind(this);

    this.state = { progress: 0 };
  }

  getPercentage() {}

  getCurrentBalance() {}

  getPredictedSpending() {}

  render() {
    return (
      <div>
        <ProgressBar animated now={this.state.progress} />
      </div>
    );
  }
}

export default SpendingBar;
