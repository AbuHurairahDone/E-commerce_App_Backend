const express = require("express");
const router = express.Router();
const userPayment = require("../controllers/payment_api's/payment");
const cancelPayment = require("../controllers/payment_api's/cancelPayment");
const successPayment = require("../controllers/payment_api's/successPayment");
const AuthToken = require("../Authentication/AuthToken");

router.route("/payment").post(AuthToken, userPayment);
router.route("/payment/cancel").get(AuthToken, cancelPayment);
router.route("/payment/success").get(AuthToken, successPayment);
module.exports = router;
