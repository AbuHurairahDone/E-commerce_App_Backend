const couponModel = require("../../models/couponModel");

const getCoupon = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.json({ message: "Coupon id Not Found", success: false });
    }
    const coupon = await couponModel.findOne({ _id: id });
    if (!coupon) {
      return res.json({ message: "Coupon not found", success: false });
    }
    res.json({ coupon, success: true });
  } catch (error) {
    res.json({ message: `Server Error ${error}`, success: false });
  }
};
module.exports = getCoupon;
