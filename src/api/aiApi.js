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

export const getHelpHistory = async () => {
  try {
    const res = await api.get("/ai/help/history");
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const sendHelpMessage = async (message) => {
  try {
    const res = await api.post("/ai/help", { message });
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
