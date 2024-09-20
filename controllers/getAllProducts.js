const productModel = require("../models/productModel");
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const products = await productModel.find().skip(skip).limit(limit);
    const totalProducts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);
    res.json({
      totalProducts,
      totalPages,
      currentPage: page,
      pageSize: limit,
      products,
    });
  } catch (error) {
    res.json({ message: `Server Error : ${error}` });
  }
};
module.exports = getAllProducts;
