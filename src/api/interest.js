import axiosInstance from './axiosInstance';

export const sendInterest = (userId) => {
  return axiosInstance.post('/interest/send', { userId });
};

export const withdrawInterest = (userId) => {
  return axiosInstance.post('/interest/withdraw', { userId });
};

export const getReceivedInterests = () => {
  return axiosInstance.get('/interest/received');
};

export const getSentInterests = () => {
  return axiosInstance.get('/interest/sent');
};

export const respondToInterest = (interestId, status) => {
  return axiosInstance.post(`/interest/${interestId}/respond`, { status });
};
