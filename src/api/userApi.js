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
export const getOtherUserProfile = async (userId) => {
  try {
    const res = await api.get(`${API_URL}/${userId}`);
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

export const uploadProfilePicture = async (formData) => {
  const res = await axios.post("/api/users/profile-picture", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return res.data;
};

export const getLeaderboard = async ({ page, limit }) => {
  try {
    const res = await api.get(`${API_URL}/leaderboard`, {
      params: { page, limit },
    });
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch leaderboard"
    );
  }
};

export const getPointHistory = async ({ page, limit }) => {
  try {
    const res = await api.get(`${API_URL}/point-history`, {
      params: { page, limit },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch Points");
  }
};
