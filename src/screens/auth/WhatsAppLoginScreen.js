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
  ProgressBar,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../constants/theme';
import { LoadingIndicator } from '../../components';
import * as authService from '../../services/authService';
import * as yup from 'yup';

/**
 * WhatsAppLoginScreen component for WhatsApp authentication
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @returns {JSX.Element} WhatsAppLoginScreen component
 */
const WhatsAppLoginScreen = ({ navigation }) => {
  const { whatsappLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Phone number validation schema
  const phoneSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
  });

  // OTP validation schema
  const otpSchema = yup.object().shape({
    otp: yup
      .string()
      .matches(/^[0-9]{6}$/, 'OTP must be 6 digits')
      .required('OTP is required'),
  });

  // Form validation for phone number
  const {
    control: phoneControl,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
  } = useForm({
    resolver: yupResolver(phoneSchema),
    defaultValues: {
      phoneNumber: '',
    },
  });

  // Form validation for OTP
  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  // Start countdown timer
  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  // Send OTP to phone number
  const onSendOTP = async (data) => {
    try {
      setLoading(true);
      setError('');
      setPhoneNumber(data.phoneNumber);
      await authService.sendWhatsappVerificationCode(data.phoneNumber);
      setOtpSent(true);
      startCountdown();
    } catch (error) {
      setError(error.message);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const onResendOTP = async () => {
    try {
      setLoading(true);
      setError('');
      await authService.sendWhatsappVerificationCode(phoneNumber);
      startCountdown();
      setSnackbarVisible(true);
      setError('OTP sent successfully');
    } catch (error) {
      setError(error.message);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and login
  const onVerifyOTP = async (data) => {
    try {
      setLoading(true);
      setError('');
      await authService.verifyWhatsappOTP(phoneNumber, data.otp);
      await whatsappLogin(phoneNumber);
      // Navigation will be handled by the auth context
    } catch (error) {
      setError(error.message);
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
    return (
      <LoadingIndicator
        fullScreen
        message={otpSent ? 'Verifying OTP...' : 'Sending OTP...'}
      />
    );
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
          <Text style={styles.title}>
            {otpSent ? 'Verify OTP' : 'WhatsApp Login'}
          </Text>

          {!otpSent ? (
            // Phone Number Input
            <>
              <Text style={styles.description}>
                Enter your phone number to receive a verification code via WhatsApp
              </Text>
              <Controller
                control={phoneControl}
                name="phoneNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Phone Number"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={styles.input}
                    mode="outlined"
                    keyboardType="phone-pad"
                    left={<TextInput.Icon icon="phone" />}
                    error={!!phoneErrors.phoneNumber}
                  />
                )}
              />
              {phoneErrors.phoneNumber && (
                <Text style={styles.errorText}>
                  {phoneErrors.phoneNumber.message}
                </Text>
              )}

              <Button
                mode="contained"
                onPress={handlePhoneSubmit(onSendOTP)}
                style={styles.button}
                labelStyle={styles.buttonLabel}
                icon={() => (
                  <Ionicons name="logo-whatsapp" size={20} color="white" />
                )}
              >
                Send OTP
              </Button>
            </>
          ) : (
            // OTP Input
            <>
              <Text style={styles.description}>
                Enter the 6-digit code sent to your WhatsApp on {phoneNumber}
              </Text>
              <Controller
                control={otpControl}
                name="otp"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="OTP"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={styles.input}
                    mode="outlined"
                    keyboardType="number-pad"
                    maxLength={6}
                    left={<TextInput.Icon icon="lock-outline" />}
                    error={!!otpErrors.otp}
                  />
                )}
              />
              {otpErrors.otp && (
                <Text style={styles.errorText}>{otpErrors.otp.message}</Text>
              )}

              {countdown > 0 && (
                <View style={styles.countdownContainer}>
                  <Text style={styles.countdownText}>
                    Resend OTP in {countdown} seconds
                  </Text>
                  <ProgressBar
                    progress={countdown / 60}
                    color={theme.colors.primary}
                    style={styles.progressBar}
                  />
                </View>
              )}

              <Button
                mode="contained"
                onPress={handleOtpSubmit(onVerifyOTP)}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Verify OTP
              </Button>

              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive the code? </Text>
                <TouchableOpacity
                  onPress={onResendOTP}
                  disabled={countdown > 0}
                >
                  <Text
                    style={[
                      styles.resendLink,
                      countdown > 0 && styles.disabledText,
                    ]}
                  >
                    Resend
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

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

      {/* Error Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={error.includes('successfully') ? styles.successSnackbar : styles.errorSnackbar}
      >
        {error}
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
  countdownContainer: {
    marginBottom: 20,
  },
  countdownText: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 5,
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  resendText: {
    color: theme.colors.text,
  },
  resendLink: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  disabledText: {
    color: theme.colors.disabled,
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

export default WhatsAppLoginScreen;
