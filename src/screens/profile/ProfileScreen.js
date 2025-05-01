import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, List, Divider, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../constants/theme';
import { LoadingIndicator } from '../../components';

/**
 * ProfileScreen component for displaying user profile
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @returns {JSX.Element} ProfileScreen component
 */
const ProfileScreen = ({ navigation }) => {
  const { user, isAuthenticated, isGuest, loading, logout, exitGuestMode } = useAuth();

  // Handle logout
  const handleLogout = async () => {
    await logout();
  };

  // Handle exit guest mode
  const handleExitGuestMode = async () => {
    await exitGuestMode();
  };

  // Navigate to login screen
  const handleLogin = () => {
    handleExitGuestMode();
  };

  // Navigate to edit profile screen
  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  // Navigate to addresses screen
  const handleAddresses = () => {
    navigation.navigate('Addresses');
  };

  // Navigate to orders screen
  const handleOrders = () => {
    navigation.navigate('Orders');
  };

  // Navigate to settings screen
  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  if (loading) {
    return <LoadingIndicator fullScreen message="Loading profile..." />;
  }

  return (
    <ScrollView style={styles.container}>
      {isAuthenticated ? (
        // Authenticated user profile
        <View style={styles.profileContainer}>
          <Avatar.Image
            size={100}
            source={
              user?.profileImage
                ? { uri: user.profileImage }
                : require('../../assets/logo.png')
            }
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.name || 'User'}</Text>
          <Text style={styles.email}>{user?.email || 'No email'}</Text>
          <Text style={styles.phone}>{user?.phoneNumber || 'No phone'}</Text>

          <Button
            mode="outlined"
            onPress={handleEditProfile}
            style={styles.editButton}
            icon={() => <Ionicons name="pencil" size={20} color={theme.colors.primary} />}
          >
            Edit Profile
          </Button>
        </View>
      ) : isGuest ? (
        // Guest user profile
        <View style={styles.guestContainer}>
          <Avatar.Icon
            size={100}
            icon="account"
            style={styles.guestAvatar}
            color={theme.colors.surface}
          />
          <Text style={styles.guestTitle}>Guest User</Text>
          <Text style={styles.guestMessage}>
            You are currently browsing as a guest. Sign in to access your profile, save addresses, and view order history.
          </Text>
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            icon={() => <Ionicons name="log-in" size={20} color="white" />}
          >
            Sign In
          </Button>
        </View>
      ) : (
        // Not authenticated and not guest (should not happen)
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Something went wrong. Please try again.</Text>
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
          >
            Sign In
          </Button>
        </View>
      )}

      <Divider style={styles.divider} />

      <List.Section>
        <List.Subheader>Account</List.Subheader>
        
        {isAuthenticated && (
          <>
            <List.Item
              title="My Addresses"
              left={() => <List.Icon icon="map-marker" />}
              right={() => <List.Icon icon="chevron-right" />}
              onPress={handleAddresses}
            />
            <Divider />
          </>
        )}
        
        <List.Item
          title="My Orders"
          left={() => <List.Icon icon="clipboard-list" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={handleOrders}
        />
        <Divider />
        
        <List.Item
          title="Settings"
          left={() => <List.Icon icon="cog" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={handleSettings}
        />
        <Divider />
        
        {isAuthenticated ? (
          <List.Item
            title="Logout"
            left={() => <List.Icon icon="logout" color={theme.colors.error} />}
            onPress={handleLogout}
            titleStyle={{ color: theme.colors.error }}
          />
        ) : isGuest && (
          <List.Item
            title="Exit Guest Mode"
            left={() => <List.Icon icon="exit-to-app" color={theme.colors.error} />}
            onPress={handleExitGuestMode}
            titleStyle={{ color: theme.colors.error }}
          />
        )}
      </List.Section>

      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.surface,
  },
  avatar: {
    marginBottom: 10,
    backgroundColor: theme.colors.primary,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 15,
  },
  editButton: {
    marginTop: 10,
  },
  guestContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.surface,
  },
  guestAvatar: {
    marginBottom: 10,
    backgroundColor: theme.colors.primary,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  guestMessage: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: theme.colors.primary,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.surface,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    marginVertical: 10,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
  },
  version: {
    fontSize: 14,
    color: theme.colors.disabled,
  },
});

export default ProfileScreen;
