// utils/paystack.js
import axios from "axios";

export const initializePayment = async (keys, amount, currency) => {
  const { secretKey } = keys;

  const data = {
    email: "customer@example.com", // Replace with the customer's email
    amount: amount * 100, // Paystack expects the amount in kobo (Naira cents)
    currency,
    callback_url: "https://your-redirect-url.com", // Replace with your redirect URL
  };

  const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    data,
    { headers: { Authorization: `Bearer ${secretKey}` } }
  );

  return response.data;
};


export const verifyPaystackPayment = async (transactionId, secretKey) => {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${transactionId}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    });
  
    return response.data.data.status === "success";
  };
