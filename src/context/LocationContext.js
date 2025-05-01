import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create context
const LocationContext = createContext();

/**
 * LocationProvider component for managing location data
 * @param {Object} props - Component props
 * @returns {JSX.Element} LocationProvider component
 */
export const LocationProvider = ({ children }) => {
  // State for current location and saved addresses
  const [currentLocation, setCurrentLocation] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);

  // Request location permission and get current location on mount
  useEffect(() => {
    const getLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status === 'granted') {
          setLocationPermission(true);
          getCurrentLocation();
        } else {
          setLocationPermission(false);
          setError('Location permission not granted');
        }
      } catch (err) {
        console.error('Error requesting location permission:', err);
        setError('Failed to request location permission');
      } finally {
        setLoading(false);
      }
    };

    getLocationPermission();
  }, []);

  // Load saved addresses from storage on mount
  useEffect(() => {
    const loadSavedAddresses = async () => {
      try {
        const addresses = await AsyncStorage.getItem('savedAddresses');
        
        if (addresses) {
          setSavedAddresses(JSON.parse(addresses));
        }
      } catch (err) {
        console.error('Error loading saved addresses:', err);
      }
    };

    loadSavedAddresses();
  }, []);

  // Get current location
  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!locationPermission) {
        setError('Location permission not granted');
        return null;
      }
      
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      const { latitude, longitude } = location.coords;
      
      setCurrentLocation({ latitude, longitude });
      
      return { latitude, longitude };
    } catch (err) {
      console.error('Error getting current location:', err);
      setError('Failed to get current location');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch saved addresses
  const fetchSavedAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // This will be implemented in the next phase
      console.log('Fetching saved addresses');
      
      // Placeholder for saved addresses data
      setSavedAddresses([]);
    } catch (err) {
      console.error('Error fetching saved addresses:', err);
      setError('Failed to fetch saved addresses');
    } finally {
      setLoading(false);
    }
  };

  // Add a new address
  const addAddress = async (address) => {
    try {
      setLoading(true);
      setError(null);
      
      // This will be implemented in the next phase
      console.log('Adding address:', address);
      
      // Update local state
      setSavedAddresses((prevAddresses) => [...prevAddresses, address]);
      
      // Save to storage
      await AsyncStorage.setItem(
        'savedAddresses',
        JSON.stringify([...savedAddresses, address])
      );
      
      return null;
    } catch (err) {
      console.error('Error adding address:', err);
      setError('Failed to add address');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Edit existing address
  const editAddress = async (addressId, updatedAddress) => {
    try {
      setLoading(true);
      setError(null);
      
      // This will be implemented in the next phase
      console.log('Editing address:', addressId, updatedAddress);
      
      // Update local state
      setSavedAddresses((prevAddresses) =>
        prevAddresses.map((address) =>
          address._id === addressId ? { ...address, ...updatedAddress } : address
        )
      );
      
      // Save to storage
      await AsyncStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
      
      return null;
    } catch (err) {
      console.error('Error editing address:', err);
      setError('Failed to edit address');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete an address
  const deleteAddress = async (addressId) => {
    try {
      setLoading(true);
      setError(null);
      
      // This will be implemented in the next phase
      console.log('Deleting address:', addressId);
      
      // Update local state
      setSavedAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address._id !== addressId)
      );
      
      // Save to storage
      await AsyncStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
      
      return null;
    } catch (err) {
      console.error('Error deleting address:', err);
      setError('Failed to delete address');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    currentLocation,
    savedAddresses,
    loading,
    error,
    locationPermission,
    getCurrentLocation,
    fetchSavedAddresses,
    addAddress,
    editAddress,
    deleteAddress,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

/**
 * Custom hook for using the location context
 * @returns {Object} Location context value
 */
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
