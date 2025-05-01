import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Snackbar,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Ionicons } from '@expo/vector-icons';
import * as yup from 'yup';
import { theme } from '../../constants/theme';
import { LoadingIndicator } from '../../components';
import * as authService from '../../services/authService';

/**
 * ForgotPasswordScreen component for password recovery
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @returns {JSX.Element} ForgotPasswordScreen component
 */
const ForgotPasswordScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // Email validation schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
  });

  // Form validation using react-hook-form and yup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  // Handle forgot password form submission
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage('');
      setIsError(false);
      
      // This is a placeholder since the actual API endpoint might not exist
      // In a real app, you would call the actual API endpoint
      // await authService.forgotPassword(data.email);
      
      // Simulate API call success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage('Password reset instructions sent to your email');
      setSnackbarVisible(true);
      
      // Navigate back to login after a short delay
      setTimeout(() => {
        navigation.navigate('Login');
      }, 3000);
    } catch (error) {
      setMessage(error.message || 'Failed to send reset instructions');
      setIsError(true);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // Navigate back to login screen
  const handleBackToLogin = () => {
    navigation.goBack();
  };

  if (loading) {
    return <LoadingIndicator fullScreen message="Sending reset instructions..." />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToLogin}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <Text style={styles.appName}>QRSay</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.description}>
            Enter your email address and we'll send you instructions to reset your password.
          </Text>

          {/* Email Input */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email-outline" />}
                error={!!errors.email}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Send Reset Instructions
          </Button>

          {/* Back to Login Link */}
          <TouchableOpacity
            onPress={handleBackToLogin}
            style={styles.backToLoginContainer}
          >
            <Text style={styles.backToLoginText}>
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Message Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={isError ? styles.errorSnackbar : styles.successSnackbar}
      >
        {message}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.text,
  },
  description: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: theme.colors.surface,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 8,
    backgroundColor: theme.colors.primary,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLoginContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  backToLoginText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  errorSnackbar: {
    backgroundColor: theme.colors.error,
  },
  successSnackbar: {
    backgroundColor: theme.colors.success,
  },
});

export default ForgotPasswordScreen;
