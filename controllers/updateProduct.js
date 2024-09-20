const productModel = require("../models/productModel");
const updateProduct = async (req, res) => {
  try {
    const id = req.query.id;
    const { name, description, price, quantity } = req.body;
    const image = req.file;
    const product = await productModel.findById(id);

    if (name) {
      product.ProductName = name;
    }
    if (description) {
      product.ProductDescription = description;
    }
    if (price) {
      product.ProductPrice = price;
    }
    if (quantity) {
      product.ProductQuantity = quantity;
    }

    if (image) {
      product.ProductImage = {
        imageName: image.originalname,
        image: {
          data: image.buffer,
          contentType: image.mimetype,
        },
      };
    }
    await product.save();
    res.json({ message: "Product updated successfully", success: true });
  } catch (error) {
    res.json({ message: `Server Error ${error}`, success: false });
  }
};
module.exports = updateProduct;
