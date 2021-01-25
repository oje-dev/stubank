const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require("config");

const encryptionTool = require("../../utils/encryptiontool");
const {
  requireFirstname,
  requireLastname,
  requirePhone,
  requireDOB,
  requireUni,
  requireCourse,
  requireAddress,
  requireCity,
  requirePostcode,
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
} = require("../../middleware/validators/registration");
const { genDetails } = require("../cardDetails");

// Import DB
const User = require("../../models/User");

const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    // Server side validation checks
    requireFirstname,
    requireLastname,
    requirePhone,
    requireDOB,
    requireUni,
    requireCourse,
    requireAddress,
    requireCity,
    requirePostcode,
    requireEmail,
    requirePassword,
    requirePasswordConfirmation,
  ],
  async (req, res) => {
    // Checks for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    // Destructure request data
    const {
      title,
      firstname,
      lastname,
      phoneno,
      dob,
      uni,
      course,
      address,
      city,
      postcode,
      email,
      password,
    } = req.body;

    try {
      let data = {
        title,
        firstname,
        lastname,
        phoneno,
        dob,
        uni,
        course,
        address,
        city,
        postcode,
        email,
        password,
      };

      // Creates salt with 10 rounds, more rounds = more secure but slower to execute
      const salt = await bcrypt.genSalt(10);
      // Hashes password
      data.password = await bcrypt.hash(password, salt);

      let encryptedData = {};

      // Encrypts data
      for (const [key, value] of Object.entries(data)) {
        encryptedData[key] = encryptionTool.encryptMessage(
          "keys/publickey.pem",
          value
        );
      }

      const emailHashed = (
        await bcrypt.hash(email, config.get("emailSalt"))
      ).toString();

      encryptedData.emailHashed = emailHashed;

      // Create DB instance
      user = new User(encryptedData);

      // Saves to db
      await user.save();

      const newAccount = {};
      newAccount.userID = user.id;
      newAccount.cardNumber = encryptionTool.encryptMessage(
        "keys/publickey.pem",
        genDetails(16)
      );
      newAccount.accountNumber = encryptionTool.encryptMessage(
        "keys/publickey.pem",
        genDetails(8)
      );

      account = new Account(newAccount);

      await account.save();

      // Change to how front end wants it
      console.log(account);

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

// @route   POST api/users/update
// @desc    Update user info
// @access  Private

module.exports = router;
