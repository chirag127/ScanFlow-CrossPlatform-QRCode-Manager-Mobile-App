import React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

/**
 * Toast component for displaying toast messages
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Whether the toast is visible
 * @param {string} props.message - Message to display
 * @param {string} props.type - Type of toast ('info', 'success', 'error', 'warning')
 * @param {Function} props.onDismiss - Function to call when toast is dismissed
 * @param {number} props.duration - Duration in milliseconds to show the toast
 * @returns {JSX.Element} Toast component
 */
const Toast = ({
  visible,
  message,
  type = 'info',
  onDismiss,
  duration = 3000,
}) => {
  // Get toast style based on type
  const getToastStyle = () => {
    switch (type) {
      case 'success':
        return styles.successToast;
      case 'error':
        return styles.errorToast;
      case 'warning':
        return styles.warningToast;
      case 'info':
      default:
        return styles.infoToast;
    }
  };

  // Get icon based on type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'alert-circle';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'information-circle';
    }
  };

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      style={[styles.toast, getToastStyle()]}
      action={{
        icon: () => <Ionicons name={getIcon()} size={24} color="white" />,
        onPress: onDismiss,
      }}
    >
      {message}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  toast: {
    borderRadius: 8,
    marginBottom: 16,
  },
  infoToast: {
    backgroundColor: theme.colors.info,
  },
  successToast: {
    backgroundColor: theme.colors.success,
  },
  errorToast: {
    backgroundColor: theme.colors.error,
  },
  warningToast: {
    backgroundColor: theme.colors.warning,
  },
});

export default Toast;
