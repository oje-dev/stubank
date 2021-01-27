import React, { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

class SpendingBar extends Component {
  constructor(props) {
    super(props);

    this.getPredictedSpending = this.getPredictedSpending.bind(this);
    this.getPercentage = this.getPercentage.bind(this);
    this.getPredictedSpending = this.getPredictedSpending.bind(this);

    this.state = {
      progress: 0,
      variant: "danger",
      currentBalance: 0,
      predictedSpend: 0,
    };
  }

  componentDidMount() {
    this.getCurrentBalance();
  }

  getPercentage() {
    const percentageSpent =
      Math.floor(
        (this.state.predictedSpend / this.state.currentBalance) * 100
      ) <= 100
        ? Math.floor(
            (this.state.predictedSpend / this.state.currentBalance) * 100
          )
        : 100;

    if (percentageSpent > 75) {
      this.setState({ variant: "danger" });
    }
    if (50 <= percentageSpent && percentageSpent <= 75) {
      this.setState({ variant: "warning" });
    }
    if (percentageSpent < 50) {
      this.setState({ variant: "success" });
    }

    this.setState({ progress: percentageSpent });
  }

  getPredictedSpending() {
    this.props.getPredictedSpending((error, data) => {
      if (error) {
        return this.setState({ predictedSpend: 0 });
      }
      this.setState({ predictedSpend: data.data });
      this.getPercentage();
    });
  }

  getCurrentBalance() {
    this.props.getCurrentBalance((error, data) => {
      if (error) {
        return this.setState({ currentBalance: 0 });
      }
      this.setState({ currentBalance: data.data.balance });
      this.getPredictedSpending();
    });
  }

  render() {
    return (
      <div>
        <ProgressBar
          style={{ marginTop: "1em" }}
          animated
          variant={this.state.variant}
          now={this.state.progress}
          label={this.state.progress + "%"}
        />
      </div>
    );
  }
}

export default SpendingBar;
