const packageModel = require("../../models/packageModel");
const productModel = require("../../models/productModel");

const createPackage = async (req, res) => {
  try {
    const { amount, productIds, name, sku, duration } = req.body;
    if (!amount || !name || !sku || !duration) {
      res.json({ message: "Please fill all the fields" });
    }
    if (!Array.isArray(productIds) || productIds.length === 0) {
      res.json({ message: "Please provide product ids" });
    }
    const foundProducts = await productModel.find({ _id: { $in: productIds } });
    if (foundProducts.length !== productIds.length) {
      res.json({ message: "Invalid product ids" });
    }

    const package = await packageModel.create({
      amount,
      productIds,
      name,
      sku,
      duration,
    });

    res.json({ message: "Package created successfully", success: true });
  } catch (error) {
    res.json({ message: `Server Error ${error}`, success: false });
  }
};
module.exports = createPackage;
