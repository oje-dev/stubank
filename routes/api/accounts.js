const express = require("express");

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
// @desc    Get the current users accounts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const accounts = await Account.find({
      userId: req.user.id,
    });

    accounts.forEach((element) => {
      element.cardNumber = encryptionTool.decryptMessage(
        "keys/publickey.pem",
        element.cardNumber
      );
      element.accountNumber = encryptionTool.decryptMessage(
        "keys/publickey.pem",
        element.accountNumber
      );
    });

    res.json(accounts);
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

// @route   POST api/account
// @desc    Create an account
// @access  Private
router.get("/balance", auth, async (req, res) => {
  const account = await Account.find({
    userId: req.user.id,
  });

  console.log(account);
  res.send(account.currentBalance);
});

module.exports = router;
