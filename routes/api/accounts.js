const express = require("express");
const config = require("config");

const auth = require("../../middleware/auth");
const Account = require("../../models/Account");
const { genDetails } = require("../cardDetails");
const encryptionTool = require("../../utils/encryptiontool");

const router = express.Router();

// @route   POST api/account
// @desc    Create an account
// @access  Private
router.post("/", auth, async (req, res) => {
  // Destructure request
  const { currentBalance, savingsAccount } = req.body;

  // Build account object
  const accountFields = {};
  accountFields.userId = req.user.id;
  if (currentBalance) accountFields.currentBalance = currentBalance;
  if (savingsAccount) accountFields.savingsAccount = savingsAccount;
  accountFields.cardNumber = encryptionTool.encryptMessage(
    "keys/publickey.pem",
    genDetails(16)
  );
  accountFields.accountNumber = encryptionTool.encryptMessage(
    "keys/publickey.pem",
    genDetails(8)
  );

  try {
    account = new Account(accountFields);

    // Save to DB
    await account.save();
    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/account
// @desc    Get the current users account
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // Finds account
    const account = await Account.findOne({
      userId: req.user.id,
      savingsAccount: false,
    });

    // Decrypts card details
    account.cardNumber = encryptionTool.decryptMessage(
      "keys/privatekey.pem",
      config.get("passphrase"),
      account.cardNumber
    );
    account.accountNumber = encryptionTool.decryptMessage(
      "keys/privatekey.pem",
      config.get("passphrase"),
      account.accountNumber
    );

    // Returns account to front-end
    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/account/:id
// @desc    Delete account
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ msg: "Account not found" });
    }

    // Check user
    if (account.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await account.remove();

    res.json({ msg: "Account removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/account/freeze/:id
// @desc    Freeze/ unfreeze an account
// @access  Private
router.post("/freeze/:id", auth, async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ msg: "Account not found" });
    }

    // Check user
    if (account.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const update = {};

    if (account.frozen) {
      update.frozen = false;
    } else {
      update.frozen = true;
    }

    await account.updateOne({ $set: update }, { new: true });

    await account.save();

    res.json({ msg: "Success" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/account/balance
// @desc    Gets the current users account balance
// @access  Private
router.get("/balance", auth, async (req, res) => {
  const account = await Account.findOne({
    userId: req.user.id,
    savingsAccount: false,
  });

  res.status(200).send({ balance: account.currentBalance });
});

module.exports = router;
