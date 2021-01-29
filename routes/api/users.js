const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult, header } = require("express-validator");
const config = require("config");
const otp = require("../../utils/totp");

const auth = require("../../middleware/auth");
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
const { requireValidPassword } = require("../../middleware/validators/login");
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
      newPassword,
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
        password: newPassword,
      };

      // Creates salt with 10 rounds, more rounds = more secure but slower to execute
      const salt = await bcrypt.genSalt(10);
      // Hashes password
      data.password = await bcrypt.hash(newPassword, salt);

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

      // Creates bank account
      const newAccount = {};
      newAccount.userId = user.id;
      newAccount.cardNumber = encryptionTool.encryptMessage(
        "keys/publickey.pem",
        genDetails(16)
      );
      newAccount.accountNumber = encryptionTool.encryptMessage(
        "keys/publickey.pem",
        genDetails(8)
      );

      account = new Account(newAccount);

      user.accountId = account.id;

      // Saves to db
      await user.save();
      await account.save();

      // Sends otp email
      otp.gentoken(user.id, req.body.email);

      res.send(user.id);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/users/update
// @desc    Update user info
// @access  Private
router.post("/update", auth, async (req, res) => {
  let user = await User.findById(req.user.id);

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
  } = req.body;

  const userUpdate = {};
  if (title) userUpdate.title = title;
  if (firstname) userUpdate.firstname = firstname;
  if (lastname) userUpdate.lastname = lastname;
  if (phoneno) userUpdate.phoneno = phoneno;
  if (dob) userUpdate.dob = dob;
  if (uni) userUpdate.uni = uni;
  if (course) userUpdate.course = course;
  if (address) userUpdate.city = city;
  if (postcode) userUpdate.postcode = email;

  let encryptedData = {};

  try {
    // Encrypts data
    for (const [key, value] of Object.entries(userUpdate)) {
      encryptedData[key] = encryptionTool.encryptMessage(
        "keys/publickey.pem",
        value
      );
    }

    user = await User.findOneAndUpdate(
      { id: req.user.id },
      { $set: encryptedData },
      { new: true }
    );

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/users/password
// @desc    Update password
// @access  Private
router.post(
  "/password",
  [auth, [requirePassword, requirePasswordConfirmation, requireValidPassword]],
  async (req, res) => {
    // Checks for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    let user = await User.findById(req.user.id);

    let { newPassword } = req.body;

    try {
      // Creates salt with 10 rounds, more rounds = more secure but slower to execute
      const salt = await bcrypt.genSalt(10);
      // Hashes password
      newPassword = await bcrypt.hash(newPassword, salt);

      // Encrypts password
      user.password = encryptionTool.encryptMessage(
        "keys/publickey.pem",
        newPassword
      );

      await user.save();
      return res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
