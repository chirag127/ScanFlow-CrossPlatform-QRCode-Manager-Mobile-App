import { useState, useCallback } from 'react';

/**
 * Custom hook for displaying toast messages
 * @param {number} duration - Duration in milliseconds to show the toast
 * @returns {Object} Object containing toast state and functions
 */
const useToast = (duration = 3000) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('info'); // 'info', 'success', 'error', 'warning'

  /**
   * Show a toast message
   * @param {string} msg - Message to display
   * @param {string} toastType - Type of toast ('info', 'success', 'error', 'warning')
   * @param {number} customDuration - Custom duration in milliseconds
   */
  const showToast = useCallback(
    (msg, toastType = 'info', customDuration = duration) => {
      setMessage(msg);
      setType(toastType);
      setVisible(true);

      // Hide toast after duration
      if (customDuration > 0) {
        setTimeout(() => {
          hideToast();
        }, customDuration);
      }
    },
    [duration]
  );

  /**
   * Hide the toast
   */
  const hideToast = useCallback(() => {
    setVisible(false);
  }, []);

  /**
   * Show a success toast
   * @param {string} msg - Message to display
   * @param {number} customDuration - Custom duration in milliseconds
   */
  const showSuccess = useCallback(
    (msg, customDuration) => {
      showToast(msg, 'success', customDuration);
    },
    [showToast]
  );

  /**
   * Show an error toast
   * @param {string} msg - Message to display
   * @param {number} customDuration - Custom duration in milliseconds
   */
  const showError = useCallback(
    (msg, customDuration) => {
      showToast(msg, 'error', customDuration);
    },
    [showToast]
  );

  /**
   * Show a warning toast
   * @param {string} msg - Message to display
   * @param {number} customDuration - Custom duration in milliseconds
   */
  const showWarning = useCallback(
    (msg, customDuration) => {
      showToast(msg, 'warning', customDuration);
    },
    [showToast]
  );

  /**
   * Show an info toast
   * @param {string} msg - Message to display
   * @param {number} customDuration - Custom duration in milliseconds
   */
  const showInfo = useCallback(
    (msg, customDuration) => {
      showToast(msg, 'info', customDuration);
    },
    [showToast]
  );

  return {
    visible,
    message,
    type,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

export default useToast;
