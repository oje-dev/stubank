import React from "react";
import Transaction from "./transaction.jsx";

class TransactionList extends React.Component {
  constructor(props) {
    super(props);
  }

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
