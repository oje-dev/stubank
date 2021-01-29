const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const config = require("config");

const encryptionTool = require("../../utils/encryptiontool");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

const { requireEmailExists } = require("../../middleware/validators/login");

const router = express.Router();

// @route   PUT api/payees
// @desc    Add a new saved payee
// @access  Private
router.put("/", [auth, [requireEmailExists]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  const emailHashed = (
    await bcrypt.hash(email, config.get("emailSalt"))
  ).toString();

  try {
    const newPayee = await User.findOne({ emailHashed }).select("accountId");

    const user = await User.findById(req.user.id);

    if (newPayee["id"] === req.user.id) {
      return res.status(400).send("Your cannot add yourself as a payee");
    }

    let name = await User.findOne({ accountId: newPayee.accountId }).select(
      "lastname"
    );

    name = encryptionTool.decryptMessage(
      "keys/privatekey.pem",
      config.get("passphrase"),
      name.lastname
    );

    // Build new payee object
    newPayeeObj = {};
    newPayeeObj.payeeID = newPayee.accountId;
    newPayeeObj.payeeEmail = email;
    newPayeeObj.payeeName = name;

    // Check if payee is already saved
    if (user.payees.toString().includes(newPayeeObj.payeeID)) {
      return res.status(400).send("Your cannot add yourself as a payee");
    }
    // Push to payee array
    user.payees.push(newPayeeObj);

    // Save to db
    await user.save();

    res.json("Payee saved");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/payees
// @desc    Get saved payees
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const payees = await User.findById(req.user.id).select("payees");

    res.json(payees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/payees/
// @desc    Delete a saved payee
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if payee exists in users saved payees
    if (!user.payees.toString().includes(req.body.id)) {
      return res.status(401).json({ msg: "Payee is not saved" });
    }

    // Get remove index
    let i = 0;
    let removeIndex = -1;
    for (i in user.payees) {
      if (user.payees[i]["payeeID"].toString() === req.body.id) {
        removeIndex = i;
      }
    }

    user.payees.splice(removeIndex, 1);

    await user.save();

    res.json("Payee removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
