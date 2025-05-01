import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

/**
 * Create axios instance with base URL and default headers
 */
const api = axios.create({
  baseURL: API_URL || 'https://qrsaybackend-36c9.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // Increase timeout for slower connections
  timeout: 15000,
});

// Log the API URL being used
console.log(`API URL: ${API_URL || 'https://qrsaybackend-36c9.onrender.com/api'}`);

/**
 * Request interceptor for adding the auth token
 */
api.interceptors.request.use(
  async (config) => {
    try {
      // Log the request for debugging
      console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);

      const token = await AsyncStorage.getItem('customerToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for handling errors
 */
api.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.log(
      `API Response: ${response.status} ${response.config.method.toUpperCase()} ${
        response.config.url
      }`
    );
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error has a response
    if (error.response) {
      // Log detailed error information
      console.error('API Error:', {
        url: originalRequest?.url,
        method: originalRequest?.method,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });

      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        // If the token is invalid or expired, clear it and redirect to login
        try {
          await AsyncStorage.removeItem('customerToken');
          await AsyncStorage.removeItem('customerDetail');
          // Navigation will be handled by the auth context
        } catch (storageError) {
          console.error('Error clearing storage on 401:', storageError);
        }
      }
    } else {
      // Network errors or other issues
      console.error('API Request Failed:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
