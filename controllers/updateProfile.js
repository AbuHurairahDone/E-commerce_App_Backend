const multer = require("multer");
const userModel = require("../models/userModel");
const AuthToken = require("../Authentication/AuthToken");
const updateProfile = async (req, res) => {
  try {
    const { username } = req.body;
    const profilePic = req.file;
    const user = await userModel.findOne({ _id: req.user._id });
    if (profilePic) {
      user.profilePic.imageName = profilePic.originalname;
      user.profilePic.image.data = profilePic.buffer;
      user.profilePic.image.contentType = profilePic.mimetype;
    }
    if (username) {
      user.username = username;
    }
    await user.save();
    res.json({ message: "Profile updated successfully", success: true });
  } catch (error) {
    res.json({ message: `Server Error ${error}` });
  }
};
module.exports = updateProfile;
