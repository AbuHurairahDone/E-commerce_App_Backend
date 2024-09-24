const packageModel = require("../../models/packageModel");
const editPackage = async (req, res) => {
  try {
    const id = req.query.id;
    const { amount, productIds, name, sku, duration } = req.body;
    const package = await packageModel.findById(id);
    if (amount) {
      package.amount = amount;
    }
    if (productIds) {
      package.productIds = productIds;
    }
    if (name) {
      package.name = name;
    }
    if (sku) {
      package.sku = sku;
    }
    if (duration) {
      package.duration = duration;
    }
    await package.save();
    res.json({ message: "Package updated successfully", success: true });
  } catch (error) {
    res.json({ message: `Server Error ${error}`, success: false });
  }
};
module.exports = editPackage;
