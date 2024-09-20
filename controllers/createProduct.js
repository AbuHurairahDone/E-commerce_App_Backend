const productModel = require("../models/productModel");
const multer = require("multer");
const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      res.json({ message: "Please fill all the fields" });
    }
    const image = req.file;
    const productData = {
      UserId: req.user._id,
      ProductName: name,
      ProductDescription: description,
      ProductPrice: price,
      ProductQuantity: quantity,
    };
    if (image) {
      productData.ProductImage = {
        imageName: image.originalname,
        image: {
          data: image.buffer,
          contentType: image.mimetype,
        },
      };
    }
    const product = await productModel.create(productData);
    res.json({ message: "Product created successfully", success: true });
  } catch (error) {
    res.json({ message: `Server Error ${error}` });
  }
};
module.exports = createProduct;
