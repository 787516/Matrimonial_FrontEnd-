import axiosInstance from './axiosInstance';

export const getProfile = () => {
  return axiosInstance.get('/profile');
};

export const updateProfile = (profileData) => {
  return axiosInstance.put('/profile', profileData);
};

export const getProfilePreferences = () => {
  return axiosInstance.get('/profile/preferences');
};

export const updateProfilePreferences = (preferences) => {
  return axiosInstance.put('/profile/preferences', preferences);
};

export const uploadProfilePhoto = (formData) => {
  return axiosInstance.post('/profile/photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
