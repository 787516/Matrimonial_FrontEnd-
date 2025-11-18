import axiosInstance from './axiosInstance';

export const searchProfiles = (filters) => {
  return axiosInstance.get('/search', { params: filters });
};

export const getFilterOptions = () => {
  return axiosInstance.get('/search/filters');
};

export const getRecommendations = () => {
  return axiosInstance.get('/search/recommendations');
};
