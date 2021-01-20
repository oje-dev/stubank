const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

// Import encryption tool
const encryptionTool = require("../../utils/encryptiontool");

// Import DB
const User = require("../../models/User");

// @todo remove repeated code

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    // Server side validation checks
    check("firstname", "Firstname is required").not().isEmpty().isAlpha(),
    check("lastname", "Lastname is required").not().isEmpty().isAlpha(),
    check("phoneno", "Please enter a valid phone number").isMobilePhone(),
    //check("dob", "You must be 18+ to create an account").isBefore(),
    check("uni", "University is required").not().isEmpty(),
    check("course", "Course is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("city", "City/town is required").not().isEmpty().isAlpha(),
    check("postcode", "Postcode is required").not().isEmpty(),
    check("email", "Please inculde a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Checks for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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

    const emailHashed = (
      await bcrypt.hash(email, config.get("emailSalt"))
    ).toString();

    try {
      // See if user exists
      let user = await User.findOne({ emailHashed });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

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

      // Encrrypts data
      let encryptedData = {};

      for (const [key, value] of Object.entries(data)) {
        encryptedData[key] = encryptionTool.encryptMessage(
          "keys/publickey.pem",
          value
        );
      }

      encryptedData.emailHashed = emailHashed;

      // Create DB instance
      user = new User(encryptedData);

      // Saves to db
      await user.save();

      //Return jsonwebtoken
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
router.post("/update", auth, async (req, res) => {
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
  } = req.body;

  try {
    // See if user exists
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Account not found" }] });
    }

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

    // Encrrypts data
    let encryptedData = {};

    for (const [key, value] of Object.entries(data)) {
      encryptedData[key] = encryptionTool.encryptMessage(
        "keys/publickey.pem",
        value
      );
    }

    encryptedData.emailHashed = emailHashed;

    // Update
    user = await User.findOneAndUpdate(
      { user: req.user.id },
      { $set: encryptedData },
      { new: true }
    );

    // Saves to db
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
