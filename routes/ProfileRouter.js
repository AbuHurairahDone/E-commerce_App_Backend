const express = require("express");
const router = express.Router();
const profileController = require("../controllers/updateProfile");
const AuthToken = require("../Authentication/AuthToken");
const multer = require("multer");
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });
router
  .route("/updateProfile")
  .post(AuthToken, upload.single("profilePic"), profileController);

module.exports = router;
