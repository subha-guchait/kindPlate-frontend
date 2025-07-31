import api from "./axios";

const API_URL = `/users`;

export const getUserProfile = async () => {
  try {
    const res = await api.get(`${API_URL}/profile`);
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const updateUserProfile = async (updates) => {
  try {
    const res = await api.patch(`${API_URL}/profile`, updates);
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
