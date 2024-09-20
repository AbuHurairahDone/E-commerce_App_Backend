const productModel = require("../models/productModel");
const deleteProduct = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.json({ message: `Product Not Found`, success: false });
    }
    await productModel.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    res.json({ message: `Server Error ${error}`, success: false });
  }
};
module.exports = deleteProduct;
