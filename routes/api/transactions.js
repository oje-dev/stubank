const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Transaction = require("../../models/Transaction");
const Account = require("../../models/Account");

// @route   POST api/transactions
// @desc    Do a transaction
// @access  Private
router.post("/", auth, async (req, res) => {
  // Destructure request
  const { sentFrom, sentTo, amount } = req.body;

  // Build transaction object
  const transactionFields = {};
  transactionFields.userId = req.user.id;
  if (sentFrom) transactionFields.sentFrom = sentFrom;
  if (sentTo) transactionFields.sentTo = sentTo;
  if (amount) transactionFields.amount = amount;

  try {
    // Find accounts
    let account = await Account.findById(sentFrom);
    let recipient = await Account.findById(sentTo);

    if (!account) {
      return res.status(400).json({ msg: "Account does not exist" });
    }

    if (!recipient) {
      return res.status(400).json({ msg: "Account does not exist" });
    }

    // Check user
    if (account.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Check frozen
    if (account.frozen) {
      return res.json({ msg: "Cannot send money from a frozen account" });
    }

    // Check accounts
    if (sentFrom === sentTo) {
      return res
        .status(400)
        .json({ msg: "Cannot send to and from the same account" });
    }
  
    const updateSender = {};
    updateSender.currentBalance = account.currentBalance - amount;

    const updateReciever = {};
    updateReciever.currentBalance = recipient.currentBalance + amount;

    await account.updateOne({ $set: updateSender }, { new: true });

    await recipient.updateOne({ $set: updateReciever }, { new: true });

    transaction = new Transaction(transactionFields);

    // Save to DB
    await transaction.save();
    await account.save();
    await recipient.save();

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/transactions
// @desc    Get all current users Transactions
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({
      date: -1,
    });

    if (!transactions) {
      return res.json({ msg: "No transactions made" });
    }

    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

// For predict:
// const predictClient = require('./predict/predictclient');

// get all the transactions (most recent last) then stringify
// const transactions = await Transaction.find({ userId: req.user.id }).sort({
//   date: 1,
// });

// const obj = JSON.stringify(data);
// call client
// predictClient.req(obj,(msg)=>{})

//function that will run when server responds
// function handlePredict(msg){
// }


// For transaction:
// const predictClient = require('./predict/predictclient');

// get all the transactions (most recent last) then stringify
// const transactions = await Transaction.find({ userId: req.user.id }).sort({
//   date: 1,
// });

// const obj = JSON.stringify(data);
// call client
// predictClient.req(obj,handlePredict)

//function that will run when server responds
// function handlePredict(msg){
// }

