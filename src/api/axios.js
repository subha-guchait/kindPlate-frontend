import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

// ✅ Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor to handle global errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const message = err.response?.data?.message;

    if (
      status === 401 ||
      message === "Jwt Expired" ||
      message === "Token Invalid"
    ) {
      toast.error("Session expired. Please log in again.");
      //localStorage.removeItem("token");
      //window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

export default api;
