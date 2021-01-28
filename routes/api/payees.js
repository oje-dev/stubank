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

    if (newPayee === req.user.id) {
      return res.json({ msg: "Cant add yourself as payee" });
    }

    let name = await User.findOne({ accountId: newPayee.accountId }).select(
      "lastname"
    );

    name = encryptionTool.decryptMessage(
      "keys/privatekey.pem",
      config.get("passphrase"),
      name.lastname
    );

    newPayeeObj = {};
    newPayeeObj.payeeID = newPayee.accountId;
    newPayeeObj.payeeEmail = email;
    newPayeeObj.payeeName = name;

    console.log(newPayeeObj);
    console.log(user.payees);

    // Check if payee is already saved
    if (user.payees.includes(newPayeeObj)) {
      return res.json({ msg: "Payee already saved" });
    }

    user.payees.push(newPayeeObj);

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

    console.log(req.body.id, "\n");

    // Get remove index

    const removePayeeList = user.payees.map((payee) => {
      payee.payeeID.toString();
      console.log(payee.payeeID);
    });

    const removeIndex = removePayeeList.indexOf(req.body.id.toString());

    console.log("\n", removeIndex);

    user.payees.splice(removeIndex, 1);

    await user.save();

    res.json("Payee removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
