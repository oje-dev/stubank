import React from "react";
import Transaction from "./transaction.jsx";

class TransactionList extends React.Component {
  render() {
    return (
      <div className="transaction-container">
        {this.props.transactions.map((transaction, index) => (
          <Transaction key={index} transaction_info={transaction} />
        ))}
      </div>
    );
  }
}

export default TransactionList;
