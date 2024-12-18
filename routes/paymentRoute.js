import express from "express";
import { initializePayment } from "../controllers/paymentController.js";
import { verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/initialize", initializePayment);
router.post("/verify", verifyPayment);

export default router;
