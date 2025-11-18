import axiosInstance from './axiosInstance';

export const getUserProfile = () => {
  return axiosInstance.get('/user/profile');
};

export const updateUserProfile = (userData) => {
  return axiosInstance.put('/user/profile', userData);
};

export const deleteUserAccount = () => {
  return axiosInstance.delete('/user/account');
};

export const getUserById = (userId) => {
  return axiosInstance.get(`/user/${userId}`);
};
