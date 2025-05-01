import * as yup from 'yup';

/**
 * Validation schema for login form
 */
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

/**
 * Validation schema for WhatsApp login form
 */
export const whatsappLoginSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  otp: yup
    .string()
    .matches(/^[0-9]{6}$/, 'OTP must be 6 digits')
    .required('OTP is required'),
});

/**
 * Validation schema for registration form
 */
export const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

/**
 * Validation schema for profile update form
 */
export const profileUpdateSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
});

/**
 * Validation schema for address form
 */
export const addressSchema = yup.object().shape({
  addressType: yup
    .string()
    .oneOf(['home', 'work', 'other'], 'Invalid address type')
    .required('Address type is required'),
  addressLine1: yup.string().required('Address line 1 is required'),
  addressLine2: yup.string(),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  pincode: yup
    .string()
    .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
    .required('Pincode is required'),
  landmark: yup.string(),
});

/**
 * Validation schema for feedback form
 */
export const feedbackSchema = yup.object().shape({
  rating: yup
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .required('Rating is required'),
  comment: yup.string().required('Comment is required'),
});

/**
 * Validation schema for contact form
 */
export const contactSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

/**
 * Validation schema for promo code form
 */
export const promoCodeSchema = yup.object().shape({
  promoCode: yup.string().required('Promo code is required'),
});

/**
 * Validation schema for order tracking form
 */
export const orderTrackingSchema = yup.object().shape({
  orderId: yup.string().required('Order ID is required'),
});

/**
 * Validation schema for room service form
 */
export const roomServiceSchema = yup.object().shape({
  roomNumber: yup.string().required('Room number is required'),
  name: yup.string().required('Name is required'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
});

/**
 * Validation schema for table selection form
 */
export const tableSelectionSchema = yup.object().shape({
  tableNumber: yup.string().required('Table number is required'),
});

/**
 * Validation schema for time selection form
 */
export const timeSelectionSchema = yup.object().shape({
  selectedTime: yup.string().required('Time is required'),
  name: yup.string().required('Name is required'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
});
