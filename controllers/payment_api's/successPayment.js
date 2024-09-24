const stripeOrderModel = require("../../models/stripeOrderModel");
const userModel = require("../../models/userModel");
const packageModel = require("../../models/packageModel");
const stripe = require("stripe")(process.env.STRIPE_SK);
const successPayment = async (req, res) => {
  const { session_id, user_id, package_id, couponcode } = req.query;

  if (!session_id || !user_id || !package_id) {
    return res.json({ message: "Invalid Request", success: false });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session) {
      return res.json({ message: "Invalid Session", success: false });
    }

    const user = await userModel.findById(user_id);
    if (!user) {
      return res.json({ message: "User Not Found", success: false });
    }
    user.subscriptionStatus = true;
    await user.save();
    const package = await packageModel.findById(package_id);
    if (!package) {
      return res.json({ message: "Package Not Found", success: false });
    }

    const order = await stripeOrderModel.create({
      user: user_id,
      package: package_id,
      amount: session.amount_total / 100,
      sessionId: session_id,
      paid: true,
      coupon: couponcode,
    });
    if (!order) {
      return res.json({ message: "Order Not created", success: false });
    }

    res.json({ message: "Payment Successfull", success: true, order });
  } catch (error) {
    return res.json({ message: `Server Error ${error}`, success: false });
  }
};
module.exports = successPayment;
