const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.json({ message: "Please fill all the fields" });
    }
    if (await userModel.findOne({ email: email })) {
      return res.json({ message: "User already exists" });
    }
    if (password.length < 6) {
      return res.json({
        message: "Password must be atleast 6 characters long",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: `MY APP Confirmation <${process.env.EMAIL}>`,
      to: user.email,
      subject: "confirmation Email",
      html: `<a href='http://localhost:${process.env.PORT}/api/v1/confirmation?token=${token}'>clickHereForConfirmation</a>`,
    };
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.json({ message: err });
      }
      console.log("Email sent: " + info.response);
    });
    res.json({ message: "User created successfully", user });
  } catch (err) {
    res.json({ message: `Server Error ${err}` });
  }
};

module.exports = userRegister;
