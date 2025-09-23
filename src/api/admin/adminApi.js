import api from "@/api/axios";

export const getAdmins = async () => {
  try {
    const res = await api.get(`/admin/admins`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
export const makeAdminApi = async (userId) => {
  try {
    const res = await api.post(`/admin/admins/make-admin/${userId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
export const removeAdminApi = async (userId) => {
  try {
    const res = await api.post(`/admin/admins/remove-admin/${userId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
