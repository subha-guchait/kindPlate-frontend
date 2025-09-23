import api from "@/api/axios";

export const queryUser = async (query) => {
  try {
    const res = await api.get(`/admin/users/search?query=${query}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
export const getUser = async ({ page = 1, limit = 5 }) => {
  try {
    const res = await api.get(`/admin/users/`, {
      params: { page, limit },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
export const blockUserApi = async (userId) => {
  try {
    const res = await api.patch(`/admin/users/block/${userId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
export const unBlockUserApi = async (userId) => {
  try {
    const res = await api.patch(`/admin/users/unblock/${userId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
