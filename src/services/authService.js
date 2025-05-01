import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from '../constants';

/**
 * Login user with email and password
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - User's email
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} User data including token
 */
export const login = async (credentials) => {
  try {
    console.log(`Attempting login for user: ${credentials.email}`);
    const response = await api.post(API_ENDPOINTS.CUSTOMER_LOGIN, credentials);

    if (response.data && response.data.data && response.data.data.token) {
      await AsyncStorage.setItem('customerToken', response.data.data.token);
      await AsyncStorage.setItem(
        'customerDetail',
        JSON.stringify(response.data.data.userData)
      );
      console.log('Login successful');
      return response.data.data;
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage =
      error.response?.data?.message || error.message || 'Login failed';
    throw new Error(errorMessage);
  }
};

/**
 * Send WhatsApp verification code
 * @param {string} phoneNumber - User's phone number
 * @returns {Promise<Object>} Response data
 */
export const sendWhatsappVerificationCode = async (phoneNumber) => {
  try {
    console.log(`Sending WhatsApp verification code to: ${phoneNumber}`);
    const response = await api.post(
      API_ENDPOINTS.SEND_WHATSAPP_VERIFICATION_CODE,
      { phoneNumber }
    );
    return response.data;
  } catch (error) {
    console.error('WhatsApp verification code error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to send verification code';
    throw new Error(errorMessage);
  }
};

/**
 * Verify WhatsApp OTP
 * @param {string} phoneNumber - User's phone number
 * @param {string} otp - OTP received via WhatsApp
 * @returns {Promise<Object>} Response data
 */
export const verifyWhatsappOTP = async (phoneNumber, otp) => {
  try {
    console.log(`Verifying WhatsApp OTP for: ${phoneNumber}`);
    const response = await api.post(API_ENDPOINTS.VERIFY_WHATSAPP_OTP, {
      phoneNumber,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error('WhatsApp OTP verification error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'OTP verification failed';
    throw new Error(errorMessage);
  }
};

/**
 * Login with WhatsApp
 * @param {string} phoneNumber - User's phone number
 * @returns {Promise<Object>} User data including token
 */
export const whatsappLogin = async (phoneNumber) => {
  try {
    console.log(`Attempting WhatsApp login for: ${phoneNumber}`);
    const response = await api.post(API_ENDPOINTS.WHATSAPP_LOGIN, {
      phoneNumber,
    });

    if (response.data && response.data.data && response.data.data.token) {
      await AsyncStorage.setItem('customerToken', response.data.data.token);
      await AsyncStorage.setItem(
        'customerDetail',
        JSON.stringify(response.data.data.userData)
      );
      console.log('WhatsApp login successful');
      return response.data.data;
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error('WhatsApp login error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'WhatsApp login failed';
    throw new Error(errorMessage);
  }
};

/**
 * Update customer data
 * @param {Object} userData - User data to update
 * @returns {Promise<Object>} Updated user data
 */
export const updateCustomerData = async (userData) => {
  try {
    console.log('Updating customer data');
    const response = await api.post(
      API_ENDPOINTS.UPDATE_CUSTOMER_DATA,
      userData
    );

    if (response.data && response.data.data && response.data.data.userData) {
      await AsyncStorage.setItem(
        'customerDetail',
        JSON.stringify(response.data.data.userData)
      );
      console.log('Customer data updated successfully');
      return response.data.data;
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Update customer data error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to update customer data';
    throw new Error(errorMessage);
  }
};

/**
 * Get customer data
 * @returns {Promise<Object>} Customer data
 */
export const getCustomer = async () => {
  try {
    console.log('Getting customer data');
    const response = await api.get(API_ENDPOINTS.GET_CUSTOMER);
    return response.data;
  } catch (error) {
    console.error('Get customer error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get customer data';
    throw new Error(errorMessage);
  }
};

/**
 * Logout user by removing stored credentials
 * @returns {Promise<boolean>} Success status
 */
export const logout = async () => {
  try {
    console.log('Logging out user');
    await AsyncStorage.removeItem('customerToken');
    await AsyncStorage.removeItem('customerDetail');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Get current user data from storage
 * @returns {Promise<Object|null>} User data or null if not logged in
 */
export const getCurrentUser = async () => {
  try {
    const user = await AsyncStorage.getItem('customerDetail');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>} Authentication status
 */
export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem('customerToken');
    return !!token;
  } catch (error) {
    console.error('Authentication check error:', error);
    return false;
  }
};
