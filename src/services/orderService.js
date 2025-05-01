import api from './api';
import { API_ENDPOINTS } from '../constants';

/**
 * Validate order before placing
 * @param {Object} data - Order data
 * @returns {Promise<Object>} Validation result
 */
export const validationBeforeOrder = async (data) => {
  try {
    console.log(`Validating order: ${JSON.stringify(data)}`);
    const response = await api.post(API_ENDPOINTS.VALIDATION_BEFORE_ORDER, data);
    return response.data;
  } catch (error) {
    console.error('Order validation error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to validate order';
    throw new Error(errorMessage);
  }
};

/**
 * Place an order
 * @param {Object} data - Order data
 * @returns {Promise<Object>} Order result
 */
export const placeOrder = async (data) => {
  try {
    console.log(`Placing order: ${JSON.stringify(data)}`);
    const response = await api.post(API_ENDPOINTS.PLACE_ORDER, data);
    return response.data;
  } catch (error) {
    console.error('Place order error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to place order';
    throw new Error(errorMessage);
  }
};

/**
 * Initialize Razorpay payment
 * @param {Object} data - Payment data
 * @returns {Promise<Object>} Payment result
 */
export const razorPay = async (data) => {
  try {
    console.log(`Initializing Razorpay payment: ${JSON.stringify(data)}`);
    const response = await api.post(API_ENDPOINTS.RAZORPAY, data);
    return response.data;
  } catch (error) {
    console.error('Razorpay error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to initialize payment';
    throw new Error(errorMessage);
  }
};

/**
 * Get customer orders
 * @returns {Promise<Object>} Customer orders
 */
export const getCustomerOrders = async () => {
  try {
    console.log('Getting customer orders');
    const response = await api.get(API_ENDPOINTS.GET_CUSTOMER_ORDERS);
    return response.data;
  } catch (error) {
    console.error('Get customer orders error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get customer orders';
    throw new Error(errorMessage);
  }
};

/**
 * Get order with order ID
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Order details
 */
export const getOrderWithOrderId = async (orderId) => {
  try {
    console.log(`Getting order with ID: ${orderId}`);
    const response = await api.get(
      `${API_ENDPOINTS.GET_ORDER_WITH_ORDER_ID}/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error('Get order with ID error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get order with ID';
    throw new Error(errorMessage);
  }
};

/**
 * Get customer's active orders
 * @returns {Promise<Object>} Active orders
 */
export const getCustomerActiveOrder = async () => {
  try {
    console.log('Getting customer active orders');
    const response = await api.get(API_ENDPOINTS.GET_CUSTOMER_ACTIVE_ORDER);
    return response.data;
  } catch (error) {
    console.error('Get customer active order error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get customer active order';
    throw new Error(errorMessage);
  }
};

/**
 * Get last order for a restaurant
 * @param {string} restaurantId - Restaurant ID
 * @returns {Promise<Object>} Last order
 */
export const getLastOrder = async (restaurantId) => {
  try {
    console.log(`Getting last order for restaurant: ${restaurantId}`);
    const response = await api.get(
      `${API_ENDPOINTS.GET_LAST_ORDER}/${restaurantId}`
    );
    return response.data;
  } catch (error) {
    console.error('Get last order error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get last order';
    throw new Error(errorMessage);
  }
};

/**
 * Change order status by user
 * @param {Object} data - Status update data
 * @returns {Promise<Object>} Update result
 */
export const changeOrderStatusByUser = async (data) => {
  try {
    console.log(`Changing order status: ${JSON.stringify(data)}`);
    const response = await api.patch(
      API_ENDPOINTS.CHANGE_ORDER_STATUS_BY_USER,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Change order status error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to change order status';
    throw new Error(errorMessage);
  }
};

/**
 * Get all rooms for a restaurant
 * @param {Object} data - Request data
 * @returns {Promise<Object>} Rooms data
 */
export const getAllRoomsRestaurant = async (data) => {
  try {
    console.log(`Getting all rooms for restaurant: ${JSON.stringify(data)}`);
    const response = await api.post(
      API_ENDPOINTS.GET_ALL_ROOMS_RESTAURANT,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Get all rooms error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get all rooms';
    throw new Error(errorMessage);
  }
};

/**
 * Call waiter
 * @param {Object} data - Waiter call data
 * @returns {Promise<Object>} Call result
 */
export const callWaiter = async (data) => {
  try {
    console.log(`Calling waiter: ${JSON.stringify(data)}`);
    const response = await api.post(API_ENDPOINTS.CALL_WAITER, data);
    return response.data;
  } catch (error) {
    console.error('Call waiter error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to call waiter';
    throw new Error(errorMessage);
  }
};
