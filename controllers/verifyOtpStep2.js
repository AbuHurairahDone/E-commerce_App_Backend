const userModel = require("../models/userModel");
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.json({ message: "Please fill all the fields" });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    if (user.otp !== otp) {
      return res.json({ message: "Invalid OTP" });
    }
    if (user.otpExpiry < Date.now()) {
      return res.json({ message: "OTP expired" });
    }
    user.otp = null;
    user.otpExpiry = null;
    user.resetPass = true;
    await user.save();
    res.json({ message: "OTP verified successfully", success: true });
  } catch (err) {
    res.json({ message: `Server Error ${err}` });
  }
};
module.exports = verifyOtp;
