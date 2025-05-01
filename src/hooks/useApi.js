import { useState, useCallback } from 'react';

/**
 * Custom hook for handling API requests with loading and error states
 * @param {Function} apiFunc - API function to call
 * @returns {Object} Object containing loading state, error state, data, and request function
 */
const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Execute the API request
   * @param {...any} args - Arguments to pass to the API function
   * @returns {Promise<any>} Promise that resolves to the API response data
   */
  const request = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError('');
        const response = await apiFunc(...args);
        setData(response);
        return response;
      } catch (err) {
        const errorMessage = err.message || 'Something went wrong';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  return { data, error, loading, request };
};

export default useApi;
