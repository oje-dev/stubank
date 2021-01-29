const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const encryptionTool = require("../../utils/encryptiontool");

const User = require("../../models/User");

module.exports = {
  // Checks supplied email against the database
  requireEmailExists: check("email", "Please include a valid email")
    .trim()
    .isEmail()
    .custom(async (email) => {
      const emailHashed = (
        await bcrypt.hash(email, config.get("emailSalt"))
      ).toString();

      let user = await User.findOne({ emailHashed });

      if (!user) {
        throw new Error("Email not found");
      }
    }),

  // Checks supplied password against the database
  requireValidPassword: check("password", "Password is required")
    .trim()
    .custom(async (password, { req }) => {
      const emailHashed = (
        await bcrypt.hash(req.body.email, config.get("emailSalt"))
      ).toString();

      let user = await User.findOne({ emailHashed });

      const isMatch = await bcrypt.compare(
        password,
        encryptionTool.decryptMessage(
          "/keys/privatekey.pem",
          config.get("passphrase"),
          user.password
        )
      );

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
    }),
};
