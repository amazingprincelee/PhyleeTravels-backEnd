import Payment from "../models/userPayment.js";

export const verifyPayment = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming user ID is in the token/session

    // Check for a successful payment
    const payment = await Payment.findOne({ userId, status: "success" });

    if (!payment) {
      return res.status(403).json({ message: "Access denied. Please complete payment." });
    }

    next(); // Payment verified, proceed to the next middleware/controller
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Server error." });
  }
};
