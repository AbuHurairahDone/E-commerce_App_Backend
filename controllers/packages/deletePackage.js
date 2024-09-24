const packageModel = require("../../models/packageModel");
const deletePackage = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.json({ message: "Package id Not Found", success: false });
    }
    const package = await packageModel.findByIdAndDelete(id);
    if (!package) {
      res.json({ message: "Package not found", success: false });
    }
    res.json({ message: "Package deleted successfully", success: true });
  } catch (error) {
    res.json({ message: `Server Error ${error}`, success: false });
  }
};
module.exports = deletePackage;
