import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../constants/theme';

/**
 * LoadingIndicator component for displaying a loading spinner
 * @param {Object} props - Component props
 * @param {string} props.message - Message to display below the spinner
 * @param {boolean} props.fullScreen - Whether to display the spinner in full screen
 * @param {Object} props.style - Additional styles for the container
 * @returns {JSX.Element} LoadingIndicator component
 */
const LoadingIndicator = ({ message, fullScreen = false, style }) => {
  return (
    <View
      style={[
        styles.container,
        fullScreen ? styles.fullScreen : styles.inline,
        style,
      ]}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
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
  },
  inline: {
    padding: 20,
  },
  message: {
    marginTop: 10,
    color: theme.colors.text,
    textAlign: 'center',
  },
});

export default LoadingIndicator;
