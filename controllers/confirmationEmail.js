const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const confirmationEmail = async (req, res) => {
  try {
    const token = req.query.token;
    console.log(token);
    let userId;
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.json({ message: "Invalid Token" });
      }
      userId = decoded._id;
    });
    const user = await userModel.findOne({ _id: userId });
    user.verified = true;
    await user.save();
    res.json({ message: `User Verified Successfully` });
  } catch (error) {
    res.json({ message: `Server Error : ${error}`, success: true });
  }
};
module.exports = confirmationEmail;
