const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");

module.exports = {
  requireFirstname: check("firstname", "Firstname is required")
    .trim()
    .not()
    .isEmpty()
    .isAlpha(),

  requireLastname: check("lastname", "Lastname is required")
    .trim()
    .not()
    .isEmpty()
    .isAlpha(),

  requirePhone: check("phoneno", "Please enter a valid phone number")
    .trim()
    .isMobilePhone(),

<<<<<<< middleware/validators/registration.js
  requireDOB: check("dob", "You must be 18 to register.").isBefore(getDate()),
=======
  requireDOB: check("dob","You must be 18 years old").isBefore(getDate()),
>>>>>>> middleware/validators/registration.js

  requireUni: check("uni", "University is required").trim().not().isEmpty(),

  requireCourse: check("course", "Course is required").trim().not().isEmpty(),

  requireAddress: check("address", "Address is required")
    .trim()
    .not()
    .isEmpty(),

  requireCity: check("city", "City/town is required")
    .trim()
    .not()
    .isEmpty()
    .isAlpha(),

  requirePostcode: check("postcode", "Postcode is required")
    .trim()
    .not()
    .isEmpty(),

  // Checks for email already in use
  requireEmail: check("email", "Must be a valid email")
    .trim()
    .isEmail()
    .custom(async (email) => {
      const emailHashed = (
        await bcrypt.hash(email, config.get("emailSalt"))
      ).toString();

      let user = await User.findOne({ emailHashed });
      if (user) {
        throw new Error("Email already in use");
      }
    }),

  requirePassword: check(
    "newPassword",
    "Password must be between 6 and 20 characters"
  )
    .trim()
    .isLength({ min: 6, max: 20 }),

  // Checks if passwords match
  requirePasswordConfirmation: check(
    "password2",
    "Password must be between 6 and 20 characters"
  )
    .trim()
    .isLength({ min: 4, max: 20 })
    .custom(async (password2, { req }) => {
      if (password2 !== req.body.newPassword) {
        throw new Error("Passwords must match");
      }
    }),
};

// Gets date 18yr ago from today
function getDate() {
  let d = new Date();
  d.setDate(d.getDate() - 6570);
  return d.toDateString();
}
