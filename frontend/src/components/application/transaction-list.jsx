import React from "react";
import Transaction from "./transaction.jsx";

class TransactionList extends React.Component {
  constructor(props) {
    super(props);

    this.transactions = this.getTransactions();
  }

  getTransactions() {
    const transactions = [
      {
        merchant_id: "100",
        merchant_name: "Barclays",
        amount: "23.75",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "200",
        merchant_name: "Tesco",
        amount: "50.21",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "400",
        merchant_name: "Gregg's",
        amount: "100.21",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
      {
        merchant_id: "238",
        merchant_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "10/1/21 16:34",
      },
    ];

    return transactions;
  }

  render() {
    return (
      <div className="transaction-container">
        {this.transactions.map((transaction, index) => (
          <Transaction key={index} transaction_info={transaction} />
        ))}
      </div>
    );
  }
}

export default TransactionList;
