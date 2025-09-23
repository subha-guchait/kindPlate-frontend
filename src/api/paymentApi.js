import api from "./axios";

export const verifyPayment = async (orderId) => {
  try {
    const response = await api.get(`/payments/verify/${orderId}`);
    return response.data;
  } catch (err) {
    console.error("Error Verifying Payment: ", err);
    throw new Error(err.response.data.message);
  }
};
