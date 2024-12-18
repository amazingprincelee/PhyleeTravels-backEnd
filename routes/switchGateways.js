import express from "express";
import Configuration from "../models/configuration.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.put("/payment-gateway", authorizeRoles("admin"), async (req, res) => {
  const { activeGateway } = req.body;
  if (!["flutterwave", "paystack"].includes(activeGateway)) {
    return res.status(400).json({ message: "Invalid payment gateway." });
  }

  try {
    const config = await Configuration.findOneAndUpdate({}, { activeGateway }, { new: true });
    res.status(200).json({ message: "Payment gateway updated successfully.", config });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating payment gateway." });
  }
});

export default router;
