// src/models/configuration.js
import mongoose from "mongoose";

const configurationSchema = new mongoose.Schema({
  activeGateway: { type: String, enum: ['flutterwave', 'paystack'], default: 'flutterwave' },
  flutterwaveKeys: {
    publicKey: { type: String, required: true },
    secretKey: { type: String, required: true },
  },
  paystackKeys: {
    publicKey: { type: String, required: true },
    secretKey: { type: String, required: true },
  },
});

export default mongoose.model("Configuration", configurationSchema);
