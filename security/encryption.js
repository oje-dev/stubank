const crypto = require("crypto");
const config = require("config");

let iv = crypto.randomBytes(16);

const key = config.get("encryptionKey");

module.exports = {
  encrypt: function (message) {
    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(message, "utf-8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
  },

  decrypt: function (encrypted) {
    let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf-8");
    decrypted += decipher.final("utf-8");

    return decrypted;
  },
};
