const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const newPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.json({ message: "Please fill all the fields" });
    }
    if (newPassword !== confirmPassword) {
      return res.json({ message: "Passwords do not match" });
    }
    if (confirmPassword.length < 6) {
      return res.json({
        message: "Password must be atleast 6 characters long",
      });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password changed successfully", success: true });
  } catch (err) {
    res.json({ message: `Server Error ${err}` });
  }
};

module.exports = newPassword;
