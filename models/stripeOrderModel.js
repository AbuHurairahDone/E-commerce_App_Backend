const mongoose = require("mongoose");
const stripeOrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "packages",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  coupon: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});
const stripeOrderModel = mongoose.model("stripeOrders", stripeOrderSchema);
module.exports = stripeOrderModel;
