import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authService from "../services/authService";

// Create context
const AuthContext = createContext();

/**
 * AuthProvider component for managing authentication state
 * @param {Object} props - Component props
 * @returns {JSX.Element} AuthProvider component
 */
export const AuthProvider = ({ children }) => {
    // State for user data, loading status, and errors
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [initializing, setInitializing] = useState(true);

    // Load user data from storage on mount
    useEffect(() => {
        const loadUserData = async () => {
            try {
                setLoading(true);

                // Check if user is authenticated
                const token = await AsyncStorage.getItem("customerToken");
                const userData = await AsyncStorage.getItem("customerDetail");

                if (token && userData) {
                    setUser(JSON.parse(userData));
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error("Error loading user data:", err);
                setError("Failed to load user data");
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
                setInitializing(false);
            }
        };

        loadUserData();
    }, []);

    /**
     * Login with email and password
     * @param {Object} credentials - User credentials
     * @param {string} credentials.email - User's email
     * @param {string} credentials.password - User's password
     * @returns {Promise<Object>} User data
     */
    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.login(credentials);

            if (response && response.userData) {
                setUser(response.userData);
                setIsAuthenticated(true);
                return response.userData;
            }

            throw new Error("Invalid response from server");
        } catch (err) {
            setError(err.message || "Login failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Login with WhatsApp
     * @param {string} phoneNumber - User's phone number
     * @returns {Promise<Object>} User data
     */
    const whatsappLogin = async (phoneNumber) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.whatsappLogin(phoneNumber);

            if (response && response.userData) {
                setUser(response.userData);
                setIsAuthenticated(true);
                return response.userData;
            }

            throw new Error("Invalid response from server");
        } catch (err) {
            setError(err.message || "WhatsApp login failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Register a new user
     * @param {Object} userData - User data
     * @returns {Promise<Object>} Registration result
     */
    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);

            // This is a placeholder since the actual API endpoint might not exist
            // In a real app, you would call the actual API endpoint
            // const response = await authService.register(userData);

            // Simulate API call success
            await new Promise((resolve) => setTimeout(resolve, 1500));

            return { success: true, message: "Registration successful" };
        } catch (err) {
            setError(err.message || "Registration failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logout the current user
     * @returns {Promise<void>}
     */
    const logout = async () => {
        try {
            setLoading(true);

            await authService.logout();

            setUser(null);
            setIsAuthenticated(false);
        } catch (err) {
            setError(err.message || "Logout failed");
            console.error("Logout error:", err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update user profile
     * @param {Object} profileData - Profile data to update
     * @returns {Promise<Object>} Updated user data
     */
    const updateProfile = async (profileData) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.updateCustomerData(profileData);

            if (response && response.userData) {
                setUser(response.userData);
                return response.userData;
            }

            throw new Error("Invalid response from server");
        } catch (err) {
            setError(err.message || "Profile update failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Get current user data
     * @returns {Promise<Object>} User data
     */
    const getCurrentUser = async () => {
        try {
            setLoading(true);
            setError(null);

            const userData = await authService.getCurrentUser();

            if (userData) {
                setUser(userData);
                return userData;
            }

            return null;
        } catch (err) {
            setError(err.message || "Failed to get current user");
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Context value
    const value = {
        user,
        loading,
        error,
        isAuthenticated,
        initializing,
        login,
        whatsappLogin,
        register,
        logout,
        updateProfile,
        getCurrentUser,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

/**
 * Custom hook for using the auth context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
