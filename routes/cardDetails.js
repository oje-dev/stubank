var crypto = require("crypto");

function byteArrayToInt(byteArray) {
  var value = 0;
  for (var i = byteArray.length - 1; i >= 0; i--) {
    value = value * 256 + byteArray[i];
  }

  return value.toString();
}

function genDetails(length) {
  return byteArrayToInt(crypto.randomBytes(8)).slice(0, length);
}

module.exports = { genDetails };
