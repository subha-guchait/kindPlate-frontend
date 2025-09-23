import api from "./axios";

export const createAd = async (adData) => {
  try {
    const res = await api.post("/ads", adData);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const getRandomAd = async () => {
  try {
    const res = await api.get("/ads/random-ad");
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const pauseAd = async (adId) => {
  try {
    const res = await api.patch(`/ads/pause/${adId}`, {});
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
export const resumeAd = async (adId) => {
  try {
    const res = await api.patch(`/ads/resume/${adId}`, {});
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
export const deleteAd = async (adId) => {
  try {
    const res = await api.delete(`/ads/${adId}`, {});
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
export const getUserAd = async ({ status = live, page = 1, limit = 1 }) => {
  try {
    const res = await api.get(`/ads`, {
      params: { status, page, limit },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
