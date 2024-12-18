import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "NGN" },
  status: { type: String, enum: ["success", "pending", "failed"], default: "pending" },
  category: { 
    type: String, 
    enum: ["consultation", "file-upload", "membership", "other"],  
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
