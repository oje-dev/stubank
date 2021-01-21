const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require("config");

const {
  requireEmailExists,
  requireValidPassword,
} = require("../../middleware/validators/login");

const User = require("../../models/User");

const router = express.Router();

// @route   POST api/auth
// @desc    User login
// @access  Public
router.post(
  "/",
  [requireEmailExists, requireValidPassword],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const emailHashed = (
        await bcrypt.hash(req.body.email, config.get("emailSalt"))
      ).toString();

      let user = await User.findOne({ emailHashed });

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
