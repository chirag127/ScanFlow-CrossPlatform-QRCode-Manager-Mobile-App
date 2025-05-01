import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { theme } from '../constants/theme';

/**
 * EmptyState component for displaying empty state messages
 * @param {Object} props - Component props
 * @param {string} props.title - Title to display
 * @param {string} props.message - Message to display
 * @param {string} props.icon - Icon name to display
 * @param {string} props.buttonText - Text for the action button
 * @param {Function} props.onButtonPress - Function to call when button is pressed
 * @param {boolean} props.fullScreen - Whether to display the empty state in full screen
 * @param {Object} props.style - Additional styles for the container
 * @returns {JSX.Element} EmptyState component
 */
const EmptyState = ({
  title,
  message,
  icon,
  buttonText,
  onButtonPress,
  fullScreen = false,
  style,
}) => {
  // Use logo as default image
  const imageSource = icon ? { uri: icon } : require('../assets/logo.png');

  return (
    <View
      style={[
        styles.container,
        fullScreen ? styles.fullScreen : styles.inline,
        style,
      ]}
    >
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title || 'Nothing to see here'}</Text>
      <Text style={styles.message}>
        {message || 'There are no items to display at the moment.'}
      </Text>
      {buttonText && onButtonPress && (
        <Button
          mode="contained"
          onPress={onButtonPress}
          style={styles.button}
          color={theme.colors.primary}
        >
          {buttonText}
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
  image: {
    width: 120,
    height: 120,
    marginBottom: 16,
    opacity: 0.7,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.text,
    textAlign: 'center',
  },
  message: {
    marginBottom: 16,
    color: theme.colors.text,
    textAlign: 'center',
    opacity: 0.7,
  },
  button: {
    marginTop: 8,
  },
});

export default EmptyState;
