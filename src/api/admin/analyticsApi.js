import api from "@/api/axios";

export const getSummary = async () => {
  try {
    const res = await api.get("/admin/analytics/summary");
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
export const getDonationStats = async (params) => {
  try {
    const res = await api.get("/admin/analytics/donation", { params });
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err.message);
  }
};

export const getRevenueStats = async (params) => {
  try {
    const res = await api.get("/admin/analytics/revenue", { params });
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err.message);
  }
};
