const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://ruhneb:PxR29CfqDjCGrZS@cluster0.ci51xdx.mongodb.net/paytm"
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
    lowercase: true,
    trim: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    maxLength: 30,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 30,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 50,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Account, User };
