import api from "./axios";

export const analyseImage = async (imageUrl) => {
  try {
    const res = await api.post("/ai/check-image", { imageUrl });
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
