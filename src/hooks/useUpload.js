import { useState } from 'react';
import { uploadProfilePhoto } from '../api/profile';

const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uploadPhoto = async (file) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append('photo', file);
      const response = await uploadProfilePhoto(formData);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadPhoto, loading, error, success };
};

export default useUpload;
