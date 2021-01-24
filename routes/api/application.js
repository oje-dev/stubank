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

    console.log(user);
    let decryptedData = {};

    for (const [key, value] of Object.entries(user)) {
      decryptedData[key] = encryptionTool.decryptMessage(
        "keys/publickey.pem",
        config.get("passphrase"),
        value
      );
    }

    res.send(decryptedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
