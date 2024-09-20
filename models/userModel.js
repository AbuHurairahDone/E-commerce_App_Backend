const { match } = require("assert");
const { profile } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: Number,
  },
  otpExpiry: {
    type: Date,
  },
  profilePic: {
    imageName: { type: String },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
});
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
