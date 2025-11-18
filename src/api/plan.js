import axiosInstance from './axiosInstance';

export const getPlans = () => {
  return axiosInstance.get('/plans');
};

export const getPlanById = (planId) => {
  return axiosInstance.get(`/plans/${planId}`);
};

export const initiatePayment = (planId) => {
  return axiosInstance.post('/payment/initiate', { planId });
};

export const verifyPayment = (paymentData) => {
  return axiosInstance.post('/payment/verify', paymentData);
};

export const getUserSubscription = () => {
  return axiosInstance.get('/subscription');
};
