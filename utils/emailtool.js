/*
Run first:
  npm i -D @sendgrid/mail

Example Usage:
 
const emailTool = require("./emailtool");

emailTool.sendEmail(
  {
    address: "o.elkheir1@newcastle.ac.uk",
    subject: "Test Email",
    html: "<h1>Test Email</h1>",
    text: "Test Email",
  },
  (error) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email Sent");
  }
);
*/

const sendGrid = require("@sendgrid/mail");

// Try not to share anywhere please.
const apiKey =
  "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";

sendGrid.setApiKey(apiKey);

/**
 * Asynchronous function to send emails, authentication has been completed already.
 *
 * @param {Object} info - Contains four members. { address : "recipient_address", subject: "subject_line", html: "email_body", text: "email_body" }.
 * @param {Function} callback - Arrow function with one argument 'error', if error is defined then the email has not been sent and the error message can be viewed. If error is undefined the email has been sent successfully.
 */
const sendEmail = (info, callback) => {
  if (!info.address || !info.subject || !info.text || !info.html) {
    return callback(
      "Please ensure object contains members: address, subject, text, html."
    );
  }
  const email = {
    to: info.address,
    from: "Stubank Support <noreply@stubank.online>",
    subject: info.subject,
    text: info.text,
    html: info.html,
  };

  sendGrid
    .send(email)
    .then(() => {
      callback(undefined);
    })
    .catch((error) => {
      callback(error);
    });
};

module.exports = { sendEmail };
