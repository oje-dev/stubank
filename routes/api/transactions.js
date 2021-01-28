const express = require("express");
const config = require("config");

const auth = require("../../middleware/auth");
const client = require("../../machinelearning/client");
const encryptionTool = require("../../utils/encryptiontool");

const Transaction = require("../../models/Transaction");
const Account = require("../../models/Account");
const otp = require("../../utils/totp");
const User = require("../../models/User");

const router = express.Router();

// @route   POST api/transactions
// @desc    Do a transaction
// @access  Private
router.post("/", auth, async (req, res) => {
  // Destructure request
  const { sentFrom, sentTo, amount, recipientName } = req.body;

  // Build transaction object
  const transactionFields = {};
  transactionFields.userId = req.user.id;
  if (sentFrom) transactionFields.sentFrom = sentFrom;
  if (sentTo) transactionFields.sentTo = sentTo;
  if (amount) transactionFields.amount = amount;
  if (recipientName) {
    transactionFields.recipientName = recipientName;
  } else {
    const recipientUser = await Account.findById(sentTo).select("userId");
    let firstname = await User.findById(recipientUser.userId).select(
      "firstname"
    );
    let lastname = await User.findById(recipientUser.userId).select("lastname");
    firstname = encryptionTool.decryptMessage(
      "/keys/privatekey.pem",
      config.get("passphrase"),
      firstname.firstname
    );
    lastname = encryptionTool.decryptMessage(
      "/keys/privatekey.pem",
      config.get("passphrase"),
      lastname.lastname
    );
    transactionFields.recipientName = firstname.concat(" ").concat(lastname);
  }

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

    // Checks for fraud
    const transactions = await Transaction.find({
      userId: req.user.id,
      sentTo,
    }).select("amount");
    transactions.push({ _id: 0, amount: amount });
    const stringifiedTransactions = JSON.stringify(transactions);
    // returns isAnomalous, true is an anomaly, false is a 'real' transaction
    client.req(
      stringifiedTransactions,
      "ws://0.0.0.0:5007/",
      async (isAnomalous) => {
        if (isAnomalous === "True") {
          //send a 2FA request
          const email = await User.findById(req.user.id).select("email");
          const emailDecrypted = encryptionTool.decryptMessage(
            "/keys/privatekey.pem",
            config.get("passphrase"),
            email.email
          );
          otp.gentoken(req.user.id, emailDecrypted);
        } else {
          transaction = new Transaction(transactionFields);
          // Save to DB
          await transaction.save();
          await account.save();
          await recipient.save();
          res.json(transaction);
        }
      }
    );
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
      return res.sendStatus(400).json({ msg: "No transactions made" });
    }

    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/transactions/predict
// @desc Predict future spending
// @access Private
router.get("/predict", auth, async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user.id });
  if (transactions.length === 0) {
    return res.send("0");
  }
  const stringifiedTransaction = JSON.stringify(transactions);
  client.req(
    stringifiedTransaction,
    "ws://0.0.0.0:5003/",
    (predictionAmount) => {
      res.send(predictionAmount);
    }
  );
});

module.exports = router;
