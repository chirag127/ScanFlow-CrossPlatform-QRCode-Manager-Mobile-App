import { Platform, Dimensions } from 'react-native';
import { format } from 'date-fns';

/**
 * Get the screen dimensions
 * @returns {Object} Screen width and height
 */
export const getScreenDimensions = () => {
  return Dimensions.get('window');
};

/**
 * Check if the device is iOS
 * @returns {boolean} True if the device is iOS
 */
export const isIOS = () => {
  return Platform.OS === 'ios';
};

/**
 * Check if the device is Android
 * @returns {boolean} True if the device is Android
 */
export const isAndroid = () => {
  return Platform.OS === 'android';
};

/**
 * Format a date string
 * @param {string} dateString - Date string to format
 * @param {string} formatString - Format string (default: 'dd MMM yyyy')
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, formatString = 'dd MMM yyyy') => {
  try {
    const date = new Date(dateString);
    return format(date, formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format a time string
 * @param {string} timeString - Time string to format
 * @returns {string} Formatted time string
 */
export const formatTime = (timeString) => {
  try {
    const date = new Date(`2000-01-01T${timeString}`);
    return format(date, 'hh:mm a');
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString;
  }
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'INR')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'INR') => {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `₹${amount}`;
  }
};

/**
 * Truncate text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length (default: 50)
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 50) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

/**
 * Calculate distance between two coordinates in kilometers
 * @param {Object} coord1 - First coordinate { latitude, longitude }
 * @param {Object} coord2 - Second coordinate { latitude, longitude }
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (coord1, coord2) => {
  if (!coord1 || !coord2) return null;
  
  const { latitude: lat1, longitude: lon1 } = coord1;
  const { latitude: lat2, longitude: lon2 } = coord2;
  
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  
  return distance;
};

/**
 * Convert degrees to radians
 * @param {number} deg - Degrees
 * @returns {number} Radians
 */
const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

/**
 * Get a random color
 * @returns {string} Random color in hex format
 */
export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
};

/**
 * Get initials from a name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

/**
 * Check if a string is a valid URL
 * @param {string} url - URL to check
 * @returns {boolean} True if the URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
