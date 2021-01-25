import React from "react";
import Transaction from "./transaction.jsx";

class TransactionList extends React.Component {
  constructor(props) {
    super(props);

    this.getTransactions = this.getTransactions.bind(this);

    this.state = {
      transactions: [{ merchant_name: "Loading..." }],
    };

    this.getTransactions();
  }

  getTransactions() {
    this.props.getTransactions((error, data) => {
      if (error) {
        return this.setState({
          transactions: [
            {
              merchant_name:
                "Error retrieving transaction information, please refresh the page.",
            },
          ],
        });
      }
      this.setState({ transactions: data.data });
    });
  }

  render() {
    return (
      <div className="transaction-container">
        {this.state.transactions.map((transaction, index) => (
          <Transaction
            key={index}
            transaction_info={transaction}
            currencyFormatter={this.props.currencyFormatter}
          />
        ))}
      </div>
    );
  }
}

export default TransactionList;
