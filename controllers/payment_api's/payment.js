const stripe = require("stripe")(process.env.STRIPE_SK);
const packageModel = require("../../models/packageModel");
const userModel = require("../../models/userModel");
const couponModel = require("../../models/couponModel");
const stripePayment = async (req, res) => {
  const userId = req.user._id;
  const { packageId, couponcode } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ message: "User not Found" });
    }
    const package = await packageModel.findById(packageId);
    if (!package) {
      return res.json({ message: "Package not Found" });
    }
    const checkCoupon = await couponModel.findOne({ code: couponcode });
    let discountedPrice = package.amount;
    if (checkCoupon) {
      if (checkCoupon.expiry < Date.now()) {
        return res.json({ message: "Coupon expired" });
      }
      if (checkCoupon.usageLimit <= 0) {
        return res.json({ message: "Coupon limit exceeded" });
      }
      checkCoupon.usageLimit = checkCoupon.usageLimit - 1;
      await checkCoupon.save();
      user.subscriptionStatus = true;
      user.save();
      discountedPrice =
        package.amount - (package.amount * checkCoupon.discount) / 100;
    }
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: package.name,
            },
            unit_amount: discountedPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:1000/api/v1/payment/success?session_id={CHECKOUT_SESSION_ID}&user_id=${userId}&package_id=${packageId}&couponcode=${couponcode}`,
      cancel_url: `http://localhost:1000/api/v1/payment/cancel`,
      customer_email: user.email,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.json({ message: `Server Error ${error}` });
  }
};
module.exports = stripePayment;
