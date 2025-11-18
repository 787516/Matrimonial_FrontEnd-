import { useState } from 'react';
import { initiatePayment, verifyPayment } from '../api/plan';

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiatePaymentProcess = async (planId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await initiatePayment(planId);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Payment initiation failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyPaymentProcess = async (paymentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await verifyPayment(paymentData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Payment verification failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { initiatePaymentProcess, verifyPaymentProcess, loading, error };
};

export default usePayment;
