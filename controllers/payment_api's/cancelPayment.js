const cancelPayment = async (req, res) => {
  res.json({ message: `Payment Canceled` });
};
module.exports = cancelPayment;
