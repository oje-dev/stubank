const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");

const User = require("../../models/User");

// @route   PUT api/payees
// @desc    Add a new saved payee
// @access  Private
router.put(
  "/",
  [auth, [check("email", "Email is required").isEmail()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    const emailHashed = (
      await bcrypt.hash(email, config.get("emailSalt"))
    ).toString();

    try {
      const newPayee = await User.findOne({ emailHashed }).select("id");

      if (!newPayee) {
        return res.status(404).json({ msg: "Payee not found" });
      }

      const user = await User.findById(req.user.id);

      // Check if payee is already saved
      if (user.payees.includes(newPayee.toString())) {
        return res.json({ msg: "Payee already saved" });
      }

      user.payees.push(newPayee);

      await user.save();

      res.json("Payee saved");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

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

// @route   DELETE api/payees/:id
// @desc    Delete a saved payee
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if payee exists in users saved payees
    if (!user.payees.toString().includes(req.params.id)) {
      return res.json({ msg: "Payee is not saved" });
    }

    // Get remove index
    const removeIndex = user.payees
      .map((payee) => payee.id.toString())
      .indexOf(req.params.id);

    user.payees.splice(removeIndex, 1);

    await user.save();

    res.json("Payee removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
