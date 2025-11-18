import { useState } from 'react';
import { searchProfiles } from '../api/search';

const useSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchProfiles(filters);
      setResults(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
};

export default useSearch;
