const express = require("express");
const AuthToken = require("../Authentication/AuthToken");
const router = express.Router();

const userRegister = require("../controllers/userRegister");
const userLogin = require("../controllers/userLogin");
const resetPassword = require("../controllers/resetPasswordStep1");
const verifyOtp = require("../controllers/verifyOtpStep2");
const newPassword = require("../controllers/newPasswordStep3");
const confirmationEmail = require("../controllers/confirmationEmail");

router.route("/register").post(userRegister);
router.route("/confirmation").get(confirmationEmail);
router.route("/login").post(userLogin);
// Forgot Password: Develop an endpoint to initiate password recovery via email.
router.route("/forgotPassword").post(resetPassword);
router.route("/verifyOtp").post(verifyOtp);
router.route("/newPassword").post(newPassword);
router.route("/changPassword").post(AuthToken, newPassword);

module.exports = router;
