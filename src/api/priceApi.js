import api from "./axios";

export const getPrice = async (name, day) => {
  try {
    const params = { name: name, day: day };
    const response = await api.get("/price/calculate", { params });

    return response.data;
  } catch (err) {
    console.error("Error Calculating Price: ", err);
    throw new Error(err.response.data.message);
  }
};
