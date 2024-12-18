import { initializePayment as flutterwaveInitialize } from "../utils/flutterWave.js";
import { initializePayment as paystackInitialize } from "../utils/paystack.js";
import { verifyPaystackPayment } from "../utils/paystack.js";
import { verifyFlutterwavePayment } from "../utils/flutterWave.js";

export const initializePayment = async (req, res) => {
  const { amount, currency } = req.body;
  const { activeGateway, gatewayKeys } = req;

  try {
    const initialize = activeGateway === "flutterwave" ? flutterwaveInitialize : paystackInitialize;
    const paymentResponse = await initialize(gatewayKeys, amount, currency);
    res.status(200).json({ paymentResponse });
  } catch (error) {
    console.error("Error initializing payment:", error);
    res.status(500).json({ message: "Payment initialization failed." });
  }
};



export const verifyPayment = async (req, res) => {
  const { transactionId } = req.body;
  const { activeGateway, gatewayKeys } = req;

  try {
    const verify =
      activeGateway === "flutterwave" ? verifyFlutterwavePayment : verifyPaystackPayment;

    const paymentStatus = await verify(transactionId, gatewayKeys.secretKey);

    if (paymentStatus) {
      return res.status(200).json({ message: "Payment verified successfully." });
    }

    res.status(400).json({ message: "Payment verification failed." });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Payment verification failed." });
  }
};

