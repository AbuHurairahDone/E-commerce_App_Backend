const couponModel = require("../../models/couponModel");
const editCoupon = async (req, res) => {
  try {
    const id = req.query.id;
    const { code, discount, expiry, usageLimit } = req.body;
    const coupon = await couponModel.findOne({ _id: id });
    if (!coupon) {
      return res.json({ message: "Coupon not found", success: false });
    }
    if (code) {
      coupon.code = code;
    }
    if (discount) {
      coupon.discount = discount;
    }
    if (expiry) {
      if (expiry < Date.now()) {
        return res.json({ message: "Enter valid expiry date", success: false });
      }
      coupon.expiry = expiry;
    }
    if (usageLimit) {
      coupon.usageLimit = usageLimit;
    }
    await coupon.save();
    res.json({ message: "Coupon updated successfully", success: true });
  } catch (error) {
    res.json({ message: `Server Error ${error}`, success: false });
  }
};
module.exports = editCoupon;
