const { countDocuments } = require("./productModel");

const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  usageLimit: {
    type: Number,
    required: true,
  },
});
const couponModel = mongoose.model("coupons", couponSchema);
module.exports = couponModel;
