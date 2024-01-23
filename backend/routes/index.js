const express = require("express");
const app = express();

const userRouter = require("./user");
const accountRouter = require("./account");
app.use("/user", userRouter);
app.use("/account", accountRouter);
const router = express.Router();

module.exports = router;
