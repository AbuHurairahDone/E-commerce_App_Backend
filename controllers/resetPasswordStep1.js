require("dotenv").config();
const nodemailer = require("nodemailer");
const userModel = require("../models/userModel");
const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ message: "Please fill all the fields" });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    let otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    user.otpExpiry = Date.now() + 60 * 5 * 1000;
    await user.save();
    const mailOptions = {
      from: `MY APP <${process.env.EMAIL}>`,
      to: user.email,
      subject: "Password Reset",
      text: `OTP:${otp} `,
    };
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.json({ message: err });
      }
      console.log("Email sent: " + info.response);
    });
    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.json({ message: `Server Error ${err}` });
  }
};
module.exports = resetPassword;