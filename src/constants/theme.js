import { DefaultTheme } from 'react-native-paper';

/**
 * Custom theme for the application
 * Extends the DefaultTheme from react-native-paper
 */
export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF8C00', // Orange color for primary elements
    accent: '#FF5722', // Darker orange for accent elements
    background: '#F5F5F5', // Light gray background
    surface: '#FFFFFF', // White surface
    text: '#212121', // Dark text
    error: '#D32F2F', // Red for errors
    success: '#4CAF50', // Green for success
    warning: '#FFC107', // Yellow for warnings
    info: '#2196F3', // Blue for information
    disabled: '#9E9E9E', // Gray for disabled elements
    placeholder: '#9E9E9E', // Gray for placeholders
    backdrop: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for backdrops
    card: '#FFFFFF', // White for cards
    border: '#E0E0E0', // Light gray for borders
  },
  fonts: {
    ...DefaultTheme.fonts,
    // You can customize fonts here if needed
  },
  roundness: 8, // Border radius for components
  animation: {
    scale: 1.0, // Animation scale
  },
};

/**
 * Common styles used across the application
 */
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    margin: 10,
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  padding: {
    padding: 16,
  },
  marginVertical: {
    marginVertical: 10,
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
  },
};
