const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require("config");

const {
  requireEmailExists,
  requireValidPassword,
} = require("../../middleware/validators/login");
const otp = require("../../utils/totp");

const User = require("../../models/User");

const router = express.Router();

// @route   POST api/auth
// @desc    User login
// @access  Public
router.post(
  "/",
  [requireEmailExists, requireValidPassword],
  async (req, res) => {
    // Checks for errors from validation middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const emailHashed = (
        await bcrypt.hash(req.body.email, config.get("emailSalt"))
      ).toString();

      let user = await User.findOne({ emailHashed });

      // Sends otp email
      otp.gentoken(user.id, req.body.email);

      // Returns id used to verify otp
      res.send(user.id);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/auth/otp
// @desc    Verify otp and retuen jwt
// @access  Public
router.post("/otp", async (req, res) => {
  // Checks otp
  if (otp.checktoken(req.body.otp, req.body.userID)) {
    // Return jsonwebtoken
    const payload = {
      user: {
        id: req.body.userID,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      // Expires after 30 min
      { expiresIn: 1800 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } else {
    res.status(400).send("Invalid one time passcode.");
  }
});

module.exports = router;
