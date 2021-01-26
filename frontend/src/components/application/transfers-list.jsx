import React from "react";
import Transfer from "./transfer.jsx";

class TransferList extends React.Component {
  constructor(props) {
    super(props);

    this.transfers = this.getTransfers();
  }

  getTransfers() {
    const transfers = [
      {
        merchant_id: "100",
        recipient_name: "Barclays",
        amount: "23.75",
        dateAndTime: "22/1/21 12:19",
      },
      {
        merchant_id: "200",
        recipient_name: "Tesco",
        amount: "50.21",
        dateAndTime: "22/1/21 12:19",
      },
      {
        merchant_id: "400",
        recipient_name: "Gregg's",
        amount: "100.21",
        dateAndTime: "22/1/21 12:19",
      },
      {
        merchant_id: "238",
        recipient_name: "Sainsbury's",
        amount: "232.12",
        dateAndTime: "22/1/21 12:19",
      },
    ];

    return transfers;
  }

  render() {
    return (
      <div className="transaction-container">
        {this.transfers.map((transfer, index) => (
          <Transfer key={index} transfer_info={transfer} />
        ))}
      </div>
    );
  }
}

export default TransferList;
