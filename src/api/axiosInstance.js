import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:1818/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("user");
    if (raw) {
      const parsed = JSON.parse(raw);
      const token = parsed?.auth?.accessToken;

      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.error("Token parse error:", err);
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("user");
      //window.location.href = "/login";
      navigate("/login");  // using React Router

      
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
