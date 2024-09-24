const mongoose = require("mongoose");
const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  productIds: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  duration: {
    type: Date,
    required: true,
  },
});
const packageModel = mongoose.model("Packages", packageSchema);
module.exports = packageModel;
