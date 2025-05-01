/**
 * Navigation types for type checking and auto-completion
 */

// Auth Stack Navigation Types
export const AUTH_STACK = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  WHATSAPP_LOGIN: 'WhatsAppLogin',
};

// Home Stack Navigation Types
export const HOME_STACK = {
  HOME_SCREEN: 'HomeScreen',
  RESTAURANT_DETAIL: 'RestaurantDetail',
  MENU_SCREEN: 'MenuScreen',
  DISH_DETAIL: 'DishDetail',
  QR_SCANNER: 'QRScanner',
};

// Search Stack Navigation Types
export const SEARCH_STACK = {
  SEARCH_SCREEN: 'SearchScreen',
  SEARCH_RESULTS: 'SearchResults',
  FILTER_SCREEN: 'FilterScreen',
};

// Cart Stack Navigation Types
export const CART_STACK = {
  CART_SCREEN: 'CartScreen',
  CHECKOUT: 'Checkout',
  PAYMENT: 'Payment',
  PROMO_CODE: 'PromoCode',
  ORDER_TYPE: 'OrderType',
  DELIVERY_ADDRESS: 'DeliveryAddress',
  ADD_ADDRESS: 'AddAddress',
  TABLE_SELECTION: 'TableSelection',
  ROOM_SELECTION: 'RoomSelection',
  TIME_SELECTION: 'TimeSelection',
  ORDER_CONFIRMATION: 'OrderConfirmation',
  PAYMENT_SUCCESS: 'PaymentSuccess',
};

// Orders Stack Navigation Types
export const ORDERS_STACK = {
  ORDERS_SCREEN: 'OrdersScreen',
  ORDER_DETAIL: 'OrderDetail',
  ORDER_TRACKING: 'OrderTracking',
  WAITER_CALL: 'WaiterCall',
  FEEDBACK: 'Feedback',
};

// Profile Stack Navigation Types
export const PROFILE_STACK = {
  PROFILE_SCREEN: 'ProfileScreen',
  EDIT_PROFILE: 'EditProfile',
  ADDRESSES: 'Addresses',
  SETTINGS: 'Settings',
  ABOUT: 'About',
  PRIVACY_POLICY: 'PrivacyPolicy',
  TERMS_CONDITIONS: 'TermsConditions',
  CONTACT_US: 'ContactUs',
};

// Main Tab Navigation Types
export const MAIN_TABS = {
  HOME: 'Home',
  SEARCH: 'Search',
  CART: 'Cart',
  ORDERS: 'Orders',
  PROFILE: 'Profile',
};

// Root Navigation Types
export const ROOT_STACK = {
  AUTH: 'Auth',
  MAIN: 'Main',
  LOADING: 'Loading',
};
