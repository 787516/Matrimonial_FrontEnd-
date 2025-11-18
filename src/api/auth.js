import axiosInstance from './axiosInstance';

export const login = (email, password) => {
  return axiosInstance.post('/auth/login', { email, password });
};

export const register = (userData) => {
  return axiosInstance.post('/auth/register', userData);
};

export const verifyOTP = (email, otp) => {
  return axiosInstance.post('/auth/verify-otp', { email, otp });
};

export const forgotPassword = (email) => {
  return axiosInstance.post('/auth/forgot-password', { email });
};

export const resetPassword = (token, newPassword) => {
  return axiosInstance.post('/auth/reset-password', { token, newPassword });
};

export const logout = () => {
  return axiosInstance.post('/auth/logout');
};
