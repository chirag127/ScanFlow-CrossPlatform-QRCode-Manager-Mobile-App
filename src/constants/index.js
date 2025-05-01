import { API_URL } from '@env';

/**
 * API endpoints for the application
 */
export const API_ENDPOINTS = {
  // Authentication
  CUSTOMER_LOGIN: '/v1/customer/login',
  WHATSAPP_LOGIN: '/v1/customer/whatsappLogin',
  SEND_WHATSAPP_VERIFICATION_CODE: '/v1/customer/sendPhoneVerificationCode',
  VERIFY_WHATSAPP_OTP: '/v1/customer/verifyPhoneVerificationCode',
  UPDATE_CUSTOMER_DATA: '/v1/customer/updateCustomerData',
  
  // Restaurant
  GET_RESTAURANT_DATA: '/v1/restaurant/getRestaurant', // Add restaurant parameter
  GET_RESTAURANT_BY_ID: '/v1/restaurant/getRestaurantById', // Add restaurantId parameter
  SEARCH_RESTAURANTS: '/v1/restaurant/search', // Add query parameter
  GET_ALL_RESTAURANTS: '/v1/restaurant/all',
  GET_RESTAURANT_REVIEWS: '/v1/restaurant/reviews', // Add placeId parameter
  GET_NEARBY_RESTAURANTS: '/v1/customer/getNearbyRestaurants',
  GET_RESTAURANT_FROM_URL: '/v1/customer/getRestaurantDetailsFromRestaurantUrl', // Add restaurantUrl parameter
  
  // Customer
  GET_CUSTOMER: '/v1/customer/getCustomer',
  STORE_RESTAURANT: '/v1/customer/storeRestaurant',
  ADD_CUSTOMER_ADDRESS: '/v1/customer/addCustomerAddress',
  EDIT_CUSTOMER_ADDRESS: '/v1/customer/editCustomerAddress',
  DELETE_CUSTOMER_ADDRESS: '/v1/customer/deleteAddressOfRequestCustomerById', // Add id parameter
  GET_CUSTOMER_PREVIOUS_RESTAURANT: '/v1/customer/getCustomerPreviousRestaurant',
  
  // Orders
  PLACE_ORDER: '/v1/payment/getCheckSum',
  VALIDATION_BEFORE_ORDER: '/v1/orders/validationBeforeOrder',
  GET_CUSTOMER_ORDERS: '/v1/orders/customerOrder',
  GET_ORDER_WITH_ORDER_ID: '/v1/orders/getOrderwithOrderId', // Add orderId parameter
  GET_CUSTOMER_ACTIVE_ORDER: '/v1/orders/getCustomerActiveOrder',
  GET_LAST_ORDER: '/v1/orders/getLastOrder', // Add restaurantId parameter
  CHANGE_ORDER_STATUS_BY_USER: '/v1/orders/changeOrderStatusByUser',
  RAZORPAY: '/v1/payment/razorpay',
  
  // Promo Codes
  GET_PROMO_CODES: '/v1/customer/getPromoCodesForRestaurantUrl', // Add restaurantUrl parameter
  CHECK_PROMO_CODE: '/v1/customer/checkIfPromoCodeIsValid',
  
  // Table/Room
  GET_ALL_ROOMS_RESTAURANT: '/v1/customer/getAllRoomRestaurant',
  CHECK_DINE_IN_TABLE_AVAILABILITY: '/v1/restaurant/checkDineInTableAvailability',
  CHECK_ACTIVE_DINE_IN: '/v1/restaurant/checkAciveDineIn', // Add restaurantId parameter
  
  // Waiter
  CALL_WAITER: '/v1/waiter/callWaiter',
  
  // Feedback
  SUBMIT_FEEDBACK: '/v1/feedback',
  GET_FEEDBACK_BY_RESTAURANT: '/v1/feedback/restaurant', // Add restaurantId parameter
  GET_FEEDBACK_STATS: '/v1/feedback/stats', // Add restaurantId parameter
  CHECK_FEEDBACK_COLLECTION: '/v1/feedback/check-collection',
  
  // Contact
  SEND_CONTACT_US: '/v1/customer/contactUs',
  
  // Restaurant Status
  GET_RESTAURANT_STATUS: '/v1/customer/getRestaurantStatus', // Add restaurantId parameter
  IS_DINE_IN_AVAILABLE: '/v1/customer/isDineInAvailable', // Add restaurantId parameter
};

/**
 * Order status constants
 */
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

/**
 * Order type constants
 */
export const ORDER_TYPE = {
  DELIVERY: 'delivery',
  TAKEAWAY: 'takeAway',
  DINE_IN: 'dineIn',
  ROOM_SERVICE: 'roomService',
  GRAB_AND_GO: 'grabAndGo',
  SCHEDULED_DINING: 'scheduledDining',
};

/**
 * Waiter call status constants
 */
export const WAITER_CALL_STATUS = {
  PENDING: 'pending',
  ACKNOWLEDGED: 'acknowledged',
  RESOLVED: 'resolved',
};

/**
 * Payment method constants
 */
export const PAYMENT_METHOD = {
  ONLINE: 'online',
  CASH_ON_DELIVERY: 'cashOnDelivery',
};

/**
 * Dish type constants
 */
export const DISH_TYPE = {
  VEG: 'veg',
  NON_VEG: 'nonVeg',
  ALL: 'all',
};
