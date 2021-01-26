const otp = require("./totp");
otp.gentoken("imolly", "joshuamithoo@gmail.com");

otp.checktoken(req.body.usertoken, req.user.id);
