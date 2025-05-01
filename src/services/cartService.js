import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from '../constants';

/**
 * Get cart items from storage
 * @returns {Promise<Array>} Cart items
 */
export const getCartItems = async () => {
  try {
    const cartItems = await AsyncStorage.getItem('cartItem');
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    console.error('Get cart items error:', error);
    return [];
  }
};

/**
 * Set cart items in storage
 * @param {Array} items - Cart items
 * @returns {Promise<boolean>} Success status
 */
export const setCartItems = async (items) => {
  try {
    await AsyncStorage.setItem('cartItem', JSON.stringify(items));
    return true;
  } catch (error) {
    console.error('Set cart items error:', error);
    return false;
  }
};

/**
 * Get cart state from storage
 * @returns {Promise<Object>} Cart state
 */
export const getCartState = async () => {
  try {
    const cartState = await AsyncStorage.getItem('cartState');
    return cartState ? JSON.parse(cartState) : {};
  } catch (error) {
    console.error('Get cart state error:', error);
    return {};
  }
};

/**
 * Set cart state in storage
 * @param {Object} state - Cart state
 * @returns {Promise<boolean>} Success status
 */
export const setCartState = async (state) => {
  try {
    await AsyncStorage.setItem('cartState', JSON.stringify(state));
    return true;
  } catch (error) {
    console.error('Set cart state error:', error);
    return false;
  }
};

/**
 * Get promo codes for restaurant URL
 * @param {string} restaurantUrl - Restaurant URL
 * @returns {Promise<Object>} Promo codes
 */
export const getPromoCodesForRestaurantUrl = async (restaurantUrl) => {
  try {
    console.log(`Getting promo codes for restaurant URL: ${restaurantUrl}`);
    const response = await api.get(
      `${API_ENDPOINTS.GET_PROMO_CODES}/${restaurantUrl}`
    );
    return response.data;
  } catch (error) {
    console.error('Get promo codes error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to get promo codes';
    throw new Error(errorMessage);
  }
};

/**
 * Check if promo code is valid
 * @param {Object} data - Request data
 * @param {string} data.promoCode - Promo code
 * @param {string} data.restaurantId - Restaurant ID
 * @param {number} data.orderAmount - Order amount
 * @returns {Promise<Object>} Validation result
 */
export const checkIfPromoCodeIsValid = async (data) => {
  try {
    console.log(`Checking if promo code is valid: ${JSON.stringify(data)}`);
    const response = await api.post(API_ENDPOINTS.CHECK_PROMO_CODE, data);
    return response.data;
  } catch (error) {
    console.error('Check promo code error:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to check promo code';
    throw new Error(errorMessage);
  }
};

/**
 * Calculate cart totals
 * @param {Array} items - Cart items
 * @param {Object} restaurant - Restaurant data
 * @param {Object} promoCode - Promo code data
 * @returns {Object} Cart totals
 */
export const calculateCartTotals = (items, restaurant, promoCode = null) => {
  if (!items || !items.length) {
    return {
      itemTotal: 0,
      gstAmount: 0,
      deliveryAmount: 0,
      discountAmount: 0,
      amountToBePaid: 0,
    };
  }

  // Calculate item total
  const itemTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate GST amount
  let gstAmount = 0;
  if (restaurant?.isGstApplicable && !restaurant?.isPricingInclusiveOfGST) {
    const gstPercentage = restaurant.customGSTPercentage || 5;
    gstAmount = (itemTotal * gstPercentage) / 100;
  }

  // Calculate delivery amount
  let deliveryAmount = 0;
  if (restaurant?.provideDelivery) {
    if (
      restaurant.minOrderValueForFreeDelivery &&
      itemTotal >= restaurant.minOrderValueForFreeDelivery
    ) {
      deliveryAmount = 0;
    } else {
      deliveryAmount = restaurant.deliveryFeeBelowMinValue || 0;
    }
  }

  // Calculate discount amount
  let discountAmount = 0;
  if (promoCode) {
    if (promoCode.discountType === 'percentage') {
      discountAmount = (itemTotal * promoCode.discountValue) / 100;
      if (promoCode.maxDiscount && discountAmount > promoCode.maxDiscount) {
        discountAmount = promoCode.maxDiscount;
      }
    } else {
      discountAmount = promoCode.discountValue;
    }
  }

  // Calculate amount to be paid
  const amountToBePaid = itemTotal + gstAmount + deliveryAmount - discountAmount;

  return {
    itemTotal,
    gstAmount,
    deliveryAmount,
    discountAmount,
    amountToBePaid,
  };
};
