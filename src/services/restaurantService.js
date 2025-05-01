import api from './api';
import { API_ENDPOINTS } from '../constants';

/**
 * Get restaurant data by URL
 * @param {string} restaurantUrl - Restaurant URL
 * @returns {Promise<Object>} Restaurant data
 */
export const getRestaurantData = async (restaurantUrl) => {
  try {
    console.log(`Getting restaurant data for: ${restaurantUrl}`);
    const response = await api.get(
      `${API_ENDPOINTS.GET_RESTAURANT_DATA}?restaurant=${restaurantUrl}`
    );
    return response.data;
  } catch (error) {
    console.error('Get restaurant data error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get restaurant data';
    throw new Error(errorMessage);
  }
};

/**
 * Get restaurant by ID
 * @param {string} restaurantId - Restaurant ID
 * @returns {Promise<Object>} Restaurant data
 */
export const getRestaurantById = async (restaurantId) => {
  try {
    console.log(`Getting restaurant by ID: ${restaurantId}`);
    const response = await api.get(
      `${API_ENDPOINTS.GET_RESTAURANT_BY_ID}/${restaurantId}`
    );
    return response.data;
  } catch (error) {
    console.error('Get restaurant by ID error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get restaurant by ID';
    throw new Error(errorMessage);
  }
};

/**
 * Search restaurants by query
 * @param {string} query - Search query
 * @returns {Promise<Object>} Search results
 */
export const searchRestaurants = async (query) => {
  try {
    console.log(`Searching restaurants with query: ${query}`);
    const response = await api.get(
      `${API_ENDPOINTS.SEARCH_RESTAURANTS}?query=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error('Search restaurants error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to search restaurants';
    throw new Error(errorMessage);
  }
};

/**
 * Get all restaurants
 * @returns {Promise<Object>} All restaurants
 */
export const getAllRestaurants = async () => {
  try {
    console.log('Getting all restaurants');
    const response = await api.get(API_ENDPOINTS.GET_ALL_RESTAURANTS);
    return response.data;
  } catch (error) {
    console.error('Get all restaurants error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get all restaurants';
    throw new Error(errorMessage);
  }
};

/**
 * Get restaurant reviews
 * @param {string} placeId - Google Place ID
 * @returns {Promise<Object>} Restaurant reviews
 */
export const getRestaurantReviews = async (placeId) => {
  try {
    console.log(`Getting restaurant reviews for place ID: ${placeId}`);
    const response = await api.get(
      `${API_ENDPOINTS.GET_RESTAURANT_REVIEWS}/${placeId}`
    );
    return response.data;
  } catch (error) {
    console.error('Get restaurant reviews error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get restaurant reviews';
    throw new Error(errorMessage);
  }
};

/**
 * Get nearby restaurants
 * @param {Object} location - User location
 * @param {number} location.latitude - Latitude
 * @param {number} location.longitude - Longitude
 * @returns {Promise<Object>} Nearby restaurants
 */
export const getNearbyRestaurants = async (location) => {
  try {
    console.log(`Getting nearby restaurants for location: ${JSON.stringify(location)}`);
    const response = await api.get(
      `${API_ENDPOINTS.GET_NEARBY_RESTAURANTS}?latitude=${location.latitude}&longitude=${location.longitude}`
    );
    return response.data;
  } catch (error) {
    console.error('Get nearby restaurants error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get nearby restaurants';
    throw new Error(errorMessage);
  }
};

/**
 * Get restaurant details from URL
 * @param {string} restaurantUrl - Restaurant URL
 * @returns {Promise<Object>} Restaurant details
 */
export const getRestaurantFromUrl = async (restaurantUrl) => {
  try {
    console.log(`Getting restaurant details from URL: ${restaurantUrl}`);
    const response = await api.get(
      `${API_ENDPOINTS.GET_RESTAURANT_FROM_URL}/${restaurantUrl}`
    );
    return response.data;
  } catch (error) {
    console.error('Get restaurant from URL error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get restaurant from URL';
    throw new Error(errorMessage);
  }
};

/**
 * Store restaurant in user's history
 * @param {Object} data - Request data
 * @param {string} data.restaurantId - Restaurant ID
 * @param {string} data.email - User email
 * @returns {Promise<Object>} Response data
 */
export const storeRestaurant = async (data) => {
  try {
    console.log(`Storing restaurant in user's history: ${JSON.stringify(data)}`);
    const response = await api.post(API_ENDPOINTS.STORE_RESTAURANT, data);
    return response.data;
  } catch (error) {
    console.error('Store restaurant error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to store restaurant';
    throw new Error(errorMessage);
  }
};

/**
 * Get customer's previous restaurants
 * @param {Object} data - Request data
 * @returns {Promise<Object>} Previous restaurants
 */
export const getCustomerPreviousRestaurant = async (data) => {
  try {
    console.log(`Getting customer's previous restaurants: ${JSON.stringify(data)}`);
    const response = await api.post(
      API_ENDPOINTS.GET_CUSTOMER_PREVIOUS_RESTAURANT,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Get customer previous restaurant error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get customer previous restaurant';
    throw new Error(errorMessage);
  }
};

/**
 * Check dine-in table availability
 * @param {Object} data - Request data
 * @returns {Promise<Object>} Response data
 */
export const checkDineInTableAvailability = async (data) => {
  try {
    console.log(`Checking dine-in table availability: ${JSON.stringify(data)}`);
    const response = await api.patch(
      API_ENDPOINTS.CHECK_DINE_IN_TABLE_AVAILABILITY,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Check dine-in table availability error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to check dine-in table availability';
    throw new Error(errorMessage);
  }
};

/**
 * Check active dine-in
 * @param {string} restaurantId - Restaurant ID
 * @returns {Promise<Object>} Response data
 */
export const checkActiveDineIn = async (restaurantId) => {
  try {
    console.log(`Checking active dine-in for restaurant: ${restaurantId}`);
    const response = await api.get(
      `${API_ENDPOINTS.CHECK_ACTIVE_DINE_IN}/${restaurantId}`
    );
    return response.data;
  } catch (error) {
    console.error('Check active dine-in error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to check active dine-in';
    throw new Error(errorMessage);
  }
};

/**
 * Get restaurant status
 * @param {string} restaurantId - Restaurant ID
 * @returns {Promise<Object>} Restaurant status
 */
export const getRestaurantStatus = async (restaurantId) => {
  try {
    console.log(`Getting restaurant status for: ${restaurantId}`);
    const response = await api.get(
      `${API_ENDPOINTS.GET_RESTAURANT_STATUS}/${restaurantId}`
    );
    return response.data;
  } catch (error) {
    console.error('Get restaurant status error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get restaurant status';
    throw new Error(errorMessage);
  }
};

/**
 * Check if dine-in is available
 * @param {string} restaurantId - Restaurant ID
 * @returns {Promise<Object>} Dine-in availability
 */
export const isDineInAvailable = async (restaurantId) => {
  try {
    console.log(`Checking if dine-in is available for restaurant: ${restaurantId}`);
    const response = await api.get(
      `${API_ENDPOINTS.IS_DINE_IN_AVAILABLE}/${restaurantId}`
    );
    return response.data;
  } catch (error) {
    console.error('Is dine-in available error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to check if dine-in is available';
    throw new Error(errorMessage);
  }
};
