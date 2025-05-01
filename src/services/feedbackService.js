import api from './api';
import { API_ENDPOINTS } from '../constants';

/**
 * Submit feedback
 * @param {Object} data - Feedback data
 * @returns {Promise<Object>} Response data
 */
export const submitFeedback = async (data) => {
  try {
    console.log(`Submitting feedback: ${JSON.stringify(data)}`);
    const response = await api.post(API_ENDPOINTS.SUBMIT_FEEDBACK, data);
    return response.data;
  } catch (error) {
    console.error('Submit feedback error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to submit feedback';
    throw new Error(errorMessage);
  }
};

/**
 * Get feedback by restaurant
 * @param {string} restaurantId - Restaurant ID
 * @returns {Promise<Object>} Feedback data
 */
export const getFeedbackByRestaurant = async (restaurantId) => {
  try {
    console.log(`Getting feedback for restaurant: ${restaurantId}`);
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    const response = await api.get(
      `${API_ENDPOINTS.GET_FEEDBACK_BY_RESTAURANT}/${restaurantId}?_=${timestamp}`
    );
    return response.data;
  } catch (error) {
    console.error('Get feedback by restaurant error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get feedback by restaurant';
    throw new Error(errorMessage);
  }
};

/**
 * Get feedback stats
 * @param {string} restaurantId - Restaurant ID
 * @returns {Promise<Object>} Feedback stats
 */
export const getFeedbackStats = async (restaurantId) => {
  try {
    console.log(`Getting feedback stats for restaurant: ${restaurantId}`);
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    const response = await api.get(
      `${API_ENDPOINTS.GET_FEEDBACK_STATS}/${restaurantId}?_=${timestamp}`
    );
    return response.data;
  } catch (error) {
    console.error('Get feedback stats error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get feedback stats';
    throw new Error(errorMessage);
  }
};

/**
 * Check feedback collection
 * @returns {Promise<Object>} Feedback collection status
 */
export const checkFeedbackCollection = async () => {
  try {
    console.log('Checking feedback collection');
    const response = await api.get(API_ENDPOINTS.CHECK_FEEDBACK_COLLECTION);
    return response.data;
  } catch (error) {
    console.error('Check feedback collection error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to check feedback collection';
    throw new Error(errorMessage);
  }
};

/**
 * Send contact us email
 * @param {Object} data - Contact data
 * @returns {Promise<Object>} Response data
 */
export const sendContactUs = async (data) => {
  try {
    console.log(`Sending contact us email: ${JSON.stringify(data)}`);
    const response = await api.post(API_ENDPOINTS.SEND_CONTACT_US, data);
    return response.data;
  } catch (error) {
    console.error('Send contact us error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to send contact us email';
    throw new Error(errorMessage);
  }
};
