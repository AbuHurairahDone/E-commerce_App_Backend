const packageModel = require("../../models/packageModel");
const getPackage = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.json({ message: "Package id Not Found", success: false });
    }
    const package = await packageModel.findOne({ _id: id });
    if (!package) {
      return res.json({ message: "Package not found", success: false });
    }
    res.json({ package, success: true });
  } catch (error) {
    res.json({ message: `Server Error ${error}`, success: false });
  }
};
module.exports = getPackage;
