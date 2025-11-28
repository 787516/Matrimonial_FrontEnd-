import axiosInstance from './axiosInstance';

export const getProfile = (userProfileId) => {
  return axiosInstance.get(`/profile/details/${userProfileId}`);
};

export const updateProfile = (profileData) => {
  return axiosInstance.put('/profile/update', profileData);
};

export const getProfilePreferences = () => {
  return axiosInstance.get('/profile/preferences');
};

export const updateProfilePreferences = (preferences) => {
  return axiosInstance.put('/profile/preferences', preferences);
};


// export const uploadPhotoApi = (formData) => {
//   return axiosInstance.post('/profile/photos', formData);
// };
export const uploadPhotoApi = (formData) => {
  return axiosInstance.post("/profile/photos", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};


export const getGalleryApi = (userProfileId) =>
  axiosInstance.get(`/profile/gallery/${userProfileId}`);

export const deletePhotoApi = (photoId) =>
  axiosInstance.delete(`/profile/gallery/${photoId}`);