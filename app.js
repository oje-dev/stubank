const express = require("express");
const config = require("config");

const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Init Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "x-auth-token, content-type");
  next();
});

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/accounts", require("./routes/api/accounts"));
app.use("/api/payees", require("./routes/api/payees"));
app.use("/api/transactions", require("./routes/api/transactions"));
app.use("/api/application", require("./routes/api/application"));

// const PORT = process.env.port || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
