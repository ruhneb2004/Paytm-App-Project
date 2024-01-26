const { JWT_SECRET } = require("../config");
const { Account, User } = require("../db");

const authMiddleware = require("../middleware");
const express = require("express");

const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");

const signUpSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(8),
});

//! I removed the token sending from the signup

router.post("/signup", async (req, res) => {
  // console.log("me");
  const body = req.body;
  const { success } = signUpSchema.safeParse(body);
  // console.log(success);

  if (!success) return res.status(411).json({ mess: "Incorrect Inputs" });
  // console.log(success);
  const username = req.body.username;

  const userExist = await User.findOne({ username });
  if (userExist)
    return res.status(411).json({ mess: "User already exists!!!" });

  try {
    const user = await User.create(body);
    const userId = user._id;
    const account = await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });
    res.status(200).json({ mess: "User created successfully!" });
  } catch (err) {
    // console.log(err);
    res.status(400).json({ mess: "Some error occured!!!" });
  }
});

const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { username, password } = body;
  const { success } = signInSchema.safeParse(body);
  if (!success) return res.status(411).json({ mess: "Incorrect Inputs!!!" });

  const userExist = await User.findOne({
    username,
    password,
  });
  if (!userExist) return res.status(411).json({ mess: "User dosen't exist!" });

  const userId = userExist._id;
  const userAccount = await Account.findOne({
    userId,
  });
  const token = jwt.sign({ userId }, JWT_SECRET);
  const firstName = userExist.firstName;
  const lastName = userExist.lastName;

  res
    .status(200)
    .json({ mess: "Login successful!!!", token, firstName, lastName });
});

const updateSchema = zod.object({
  password: zod.string().min(8).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const body = req.body;
  const { success } = updateSchema.safeParse(body);
  if (!success) return res.status(411).json({ mess: "Incorrect Inputs!!!" });

  await User.updateOne(
    {
      _id: userId,
    },
    {
      $set: body,
    }
  );
});

//! If a user puts a symbol as a lastname or firstname the system crashes

router.get("/bulk", authMiddleware, async (req, res) => {
  // console.log("name");
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter.trim(),
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter.trim(),
          $options: "i",
        },
      },
    ],
  });

  //! This maybe wrong if so please refer to the slide no:8

  res.status(200).json({ user: users });
});

router.get("/name", (req, res) => {
  res.status(200).json({ mess: "from user.js" });
});

module.exports = router;
