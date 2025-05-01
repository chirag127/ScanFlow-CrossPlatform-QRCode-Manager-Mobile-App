import api from './api';
import { API_ENDPOINTS } from '../constants';

/**
 * Add customer address
 * @param {Object} data - Address data
 * @returns {Promise<Object>} Response data
 */
export const addCustomerAddress = async (data) => {
  try {
    console.log(`Adding customer address: ${JSON.stringify(data)}`);
    const response = await api.patch(API_ENDPOINTS.ADD_CUSTOMER_ADDRESS, data);
    return response.data;
  } catch (error) {
    console.error('Add customer address error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to add customer address';
    throw new Error(errorMessage);
  }
};

/**
 * Edit customer address
 * @param {Object} data - Updated address data
 * @returns {Promise<Object>} Response data
 */
export const editCustomerAddress = async (data) => {
  try {
    console.log(`Editing customer address: ${JSON.stringify(data)}`);
    const response = await api.patch(API_ENDPOINTS.EDIT_CUSTOMER_ADDRESS, data);
    return response.data;
  } catch (error) {
    console.error('Edit customer address error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to edit customer address';
    throw new Error(errorMessage);
  }
};

/**
 * Delete customer address
 * @param {string} addressId - Address ID
 * @returns {Promise<Object>} Response data
 */
export const deleteCustomerAddress = async (addressId) => {
  try {
    console.log(`Deleting customer address: ${addressId}`);
    const response = await api.delete(
      `${API_ENDPOINTS.DELETE_CUSTOMER_ADDRESS}/${addressId}`
    );
    return response.data;
  } catch (error) {
    console.error('Delete customer address error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to delete customer address';
    throw new Error(errorMessage);
  }
};

/**
 * Get customer addresses
 * @returns {Promise<Object>} Customer addresses
 */
export const getCustomerAddresses = async () => {
  try {
    console.log('Getting customer addresses');
    const response = await api.get(API_ENDPOINTS.GET_CUSTOMER);
    return response.data;
  } catch (error) {
    console.error('Get customer addresses error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get customer addresses';
    throw new Error(errorMessage);
  }
};

/**
 * Add past location
 * @param {Object} data - Location data
 * @returns {Promise<Object>} Response data
 */
export const addPastLocation = async (data) => {
  try {
    console.log(`Adding past location: ${JSON.stringify(data)}`);
    const response = await api.post(
      `${API_ENDPOINTS.ADD_PAST_LOCATION}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Add past location error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to add past location';
    throw new Error(errorMessage);
  }
};
