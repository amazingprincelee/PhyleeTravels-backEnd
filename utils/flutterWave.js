// utils/flutterwave.js
import axios from "axios";

export const initializePayment = async (keys, amount, currency) => {
  const { secretKey } = keys;

  const data = {
    tx_ref: `phylee_${Date.now()}`,
    amount,
    currency,
    redirect_url: "https://your-redirect-url.com", // Replace with your redirect URL
    payment_options: "card",
  };

  const response = await axios.post(
    "https://api.flutterwave.com/v3/payments",
    data,
    { headers: { Authorization: `Bearer ${secretKey}` } }
  );

  return response.data;
};


export const verifyFlutterwavePayment = async (transactionId, secretKey) => {
  const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
    headers: { Authorization: `Bearer ${secretKey}` },
  });

  return response.data.data.status === "successful";
};
