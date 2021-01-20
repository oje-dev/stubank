const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  currentBalance: {
    type: Number,
    default: 0,
  },
  savingsAccount: {
    type: Boolean,
    default: false,
  },
  frozen: {
    type: Boolean,
    default: false,
  },
});

module.exports = Account = mongoose.model("account", AccountSchema);
