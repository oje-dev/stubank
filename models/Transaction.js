const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  sentFrom: {
    type: Schema.Types.ObjectId,
    ref: "account",
  },
  sentTo: {
    type: Schema.Types.ObjectId,
    ref: "account",
  },
  recipientName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
