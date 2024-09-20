const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ProductName: {
    type: String,
    required: true,
  },
  ProductDescription: {
    type: String,
  },
  ProductPrice: {
    type: Number,
    required: true,
  },
  ProductQuantity: {
    type: Number,
    required: true,
  },
  ProductImage: {
    imageName: { type: String },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
});

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
