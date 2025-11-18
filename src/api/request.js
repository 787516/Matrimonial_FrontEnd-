import axiosInstance from './axiosInstance';

export const sendRequest = (userId) => {
  return axiosInstance.post('/request/send', { userId });
};

export const withdrawRequest = (userId) => {
  return axiosInstance.post('/request/withdraw', { userId });
};

export const getReceivedRequests = () => {
  return axiosInstance.get('/request/received');
};

export const getSentRequests = () => {
  return axiosInstance.get('/request/sent');
};

export const respondToRequest = (requestId, status) => {
  return axiosInstance.post(`/request/${requestId}/respond`, { status });
};
