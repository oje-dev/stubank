const emailTool = require("./emailtool");

const config = require("config");

var speakeasy = require("speakeasy");
// Generate a secret key.
var secret = speakeasy.generateSecret({ length: 20 });
// Access using secret.ascii, secret.hex, or secret.base32.

/**
 * Generates one time password(Valid for about 6 Minutes and window is 1 for error. Uses Id as part of secret and then emails OTP).
 * @param {Object} user - The user's UserId
 * @param {string} address - The user's email address
 */
const gentoken = (user, address) => {
  const token = speakeasy.totp({
    secret: user + secret.base32,
    encoding: "base32",
    window: 1,
    step: 180,
  });
  const text = "Your Two-Factor Authentication code is: " + token;
  console.log("The 2fa token is : ",token," (this is printed here for testing purposes, incase our SMTP server is down or you used a dummy email and could not retrieve the OTP code.");
  const html = "<h3>Your One-Time Password is: " + token + "</h3>";
  emailTool.sendEmail(
    {
      address,
      subject: "Stubank: Your One-Time Password",
      html,
      text,
    },
    (error) => {
      if (error) {
        return console.log(error);
      }
    }
  );
};

/**
 * Checks the token and returns true or false (allows an error of )).
 * @param {Object} user - The user's UserId
 * @param {string} token - The token the user has input
 */
const checktoken = (token, user) => {
  const tokenValidates = speakeasy.totp.verify({
    secret: user + secret.base32,
    encoding: "base32",
    token: token,
    window: 1,
    step: 180,
  });
  return tokenValidates;
};

exports.gentoken = gentoken;
exports.checktoken = checktoken;
