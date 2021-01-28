const express = require("express");
const config = require("config");

const auth = require("../../middleware/auth");
const encryptionTool = require("../../utils/encryptiontool");

const User = require("../../models/User");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.send("User not found");
    }

    const decryptField = (field) => {
      return encryptionTool.decryptMessage(
        "/keys/privatekey.pem",
        config.get("passphrase"),
        field
      );
    };

    let decryptedData = {
      title: decryptField(user.title),
      firstname: decryptField(user.firstname),
      lastname: decryptField(user.lastname),
      phoneno: decryptField(user.phoneno),
      dob: decryptField(user.dob),
      uni: decryptField(user.uni),
      course: decryptField(user.course),
      address: decryptField(user.address),
      city: decryptField(user.city),
      postcode: decryptField(user.postcode),
      email: decryptField(user.email),
      userId: user.accountId,
    };

    res.send(decryptedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
