const bcrypt = require("bcryptjs");
const config = require("config");
const User = require("./models/User");
const Account = require("./models/Account");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const connectDB = require("./config/db");

connectDB();

async function getAccountId(email) {
  try {
    const emailHashed = (
      await bcrypt.hash(email, config.get("emailSalt"))
    ).toString();

    const accountId = await User.findOne({ emailHashed: emailHashed }).select(
      "accountId"
    );

    return accountId;
  } catch (error) {
    console.log(error);
    return "Failed";
  }
}

async function addMoney(id, amount) {
  try {
    const account = await Account.findById(id.accountId);

    account.currentBalance = amount;

    await account.save();
    console.log(account);
    return "Success!";
  } catch (error) {
    console.log(error);
    return "Failed";
  }
}

readline.question(`Enter Email... `, async (email) => {
  const id = await getAccountId(email);

  readline.question(`Enter Balance... `, async (amount) => {
    console.log(await addMoney(id, amount));

    readline.close();
  });
});
