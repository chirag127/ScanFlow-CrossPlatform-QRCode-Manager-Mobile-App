import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { theme } from '../constants/theme';

/**
 * FormInput component for form inputs with validation
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.value - Input value
 * @param {Function} props.onChangeText - Function to call when text changes
 * @param {Function} props.onBlur - Function to call when input loses focus
 * @param {string} props.error - Error message
 * @param {boolean} props.touched - Whether the input has been touched
 * @param {Object} props.leftIcon - Left icon component
 * @param {Object} props.rightIcon - Right icon component
 * @param {Object} props.style - Additional styles for the input
 * @param {Object} props.containerStyle - Additional styles for the container
 * @param {Object} props.rest - Additional props for the TextInput component
 * @returns {JSX.Element} FormInput component
 */
const FormInput = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  leftIcon,
  rightIcon,
  style,
  containerStyle,
  ...rest
}) => {
  // Show error only if the input has been touched
  const showError = touched && !!error;

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        mode="outlined"
        style={[styles.input, style]}
        error={showError}
        left={leftIcon}
        right={rightIcon}
        theme={{
          colors: {
            primary: theme.colors.primary,
            error: theme.colors.error,
          },
        }}
        {...rest}
      />
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 8,
  },
});

export default FormInput;
