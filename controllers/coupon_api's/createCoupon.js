const couponModel = require("../../models/couponModel");
const createCoupon = async (req, res) => {
  try {
    const { code, discount, expiry, usageLimit } = req.body;
    if (!code || !discount || !expiry || !usageLimit) {
      return res.json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    if (expiry < Date.now()) {
      return res.json({
        message: "Enter valid expiry date",
        success: false,
      });
    }
    const couponCreated = await couponModel.create({
      code,
      discount,
      expiry,
      usageLimit,
    });
    res.json({ message: "Coupon created successfully", success: true });
  } catch (error) {
    res.json({ message: `Server Error ${error}`, success: false });
  }
};

module.exports = createCoupon;
