import React, { Component } from "react";

class Transaction extends Component {
  render() {
    return (
      <div className="transaction container">
        <div className="row">
          <div className="col-5 col-md-4">
            {this.props.transaction_info.date &&
              this.props.transaction_info.date
                .split("T")[0]
                .concat(" ")
                .concat(
                  this.props.transaction_info.date.split("T")[1].substring(0, 5)
                )}
          </div>
          <div className="col-4 col-md-4 text-center">
            {this.props.transaction_info.merchant_name}
          </div>
          <div className="col-3 col-md-4 text-right">
            {this.props.transaction_info.amount &&
              this.props.currencyFormatter(this.props.transaction_info.amount)}
          </div>
        </div>
      </div>
    );
  }
}

export default Transaction;
