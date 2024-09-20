const productModel = require("../models/productModel");
const getProduct = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.json({ message: "Product id Not Found", success: false });
    }
    const product = await productModel.findOne({ _id: id });
    if (!product) {
      return res.json({ message: "Product not found", success: false });
    }
    res.json({ product, success: true });
  } catch (error) {
    res.json({ message: `Server Error ${error}`, success: false });
  }
};
module.exports = getProduct;
