import axiosInstance from './axiosInstance';

// src/api/auth.js
import axios from "axios";

const API = "http://localhost:1818/api";  // change base URL if needed

// REGISTER
export const registerUserApi = async (formData) => {
  const res = await axios.post(`${API}/auth/register`, formData);
  return res.data;
};

// LOGIN
export const loginUserApi = async (formData) => {
  const res = await axios.post(`${API}/auth/login`, formData);
  return res.data;
};

// VERIFY OTP
export const verifyOtpApi = async (formData) => {
  const res = await axios.post(`${API}/auth/verify-otp`, formData);
  return res.data;
};

// Set password
export const setPasswordApi = async (formData) => {
  const res = await axios.post(`${API}/auth/set-password`, formData);
  return res.data;
};

// FORGOT PASSWORD
export const forgotPasswordApi = async (formData) => {
  const res = await axios.post(`${API}/auth/forgot-password`, formData);
  return res.data;
};

// RESET PASSWORD
export const resetPasswordApi = async (formData) => {
  const res = await axios.post(`${API}/auth/reset-password`, formData);
  return res.data;
};

// LOGOUT
// export const logoutUserApi = async (refreshToken) => {
//   const res = await axios.post(`${API}/logout`, { refreshToken });
//   return res.data;
// };
export const logoutUserApi = async (refreshToken) => {
  const res = await axiosInstance.post("/logout", { refreshToken });
  return res.data;
};