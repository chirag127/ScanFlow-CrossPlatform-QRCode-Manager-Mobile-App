import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

/**
 * ErrorDisplay component for displaying error messages
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {Function} props.onRetry - Function to call when retry button is pressed
 * @param {boolean} props.fullScreen - Whether to display the error in full screen
 * @param {Object} props.style - Additional styles for the container
 * @returns {JSX.Element} ErrorDisplay component
 */
const ErrorDisplay = ({ message, onRetry, fullScreen = false, style }) => {
  return (
    <View
      style={[
        styles.container,
        fullScreen ? styles.fullScreen : styles.inline,
        style,
      ]}
    >
      <IconButton
        icon={() => (
          <Ionicons name="alert-circle" size={48} color={theme.colors.error} />
        )}
        size={48}
        style={styles.icon}
      />
      <Text style={styles.message}>
        {message || 'Something went wrong. Please try again.'}
      </Text>
      {onRetry && (
        <Button
          mode="contained"
          onPress={onRetry}
          style={styles.button}
          color={theme.colors.primary}
        >
          Retry
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  inline: {
    padding: 20,
  },
  icon: {
    margin: 0,
    marginBottom: 16,
  },
  message: {
    marginBottom: 16,
    color: theme.colors.text,
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    marginTop: 8,
  },
});

export default ErrorDisplay;
