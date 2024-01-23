const authMiddleware = require("../middleware");

const { Account } = require("../db");
const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const { balance } = await Account.findOne({
      userId,
    });
    res.status(200).json({ balance });
  } catch (err) {
    console.log("🚀 ~ router.get ~ err:", err);
    res.status(400).json({
      mess: "Something happened while checking the balance!!!",
    });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const userId = req.userId;
    const { to, amount } = req.body;

    const fromAccount = await Account.findOne({ userId }).session(session);
    if (!fromAccount || fromAccount.balance < amount) {
      session.abortTransaction();
      session.endSession();
      return res.status(400).json({ mess: "Some error occured!" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      session.abortTransaction();
      session.endSession();
      return res.status(400).json({ mess: "Invalid Account!" });
    }

    await User.updateOne(
      { userId },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);
    await User.updateOne(
      { userId: to },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ mess: "Transaction successful" });
  } catch (err) {
    console.log("🚀 ~ router.post ~ err:", err);
    res.status(400).json({ mess: "Transaction falied!" });
  }
});

module.exports = router;
