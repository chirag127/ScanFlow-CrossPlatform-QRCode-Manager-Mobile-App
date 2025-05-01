import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useAuth } from "./AuthContext";
import { useRestaurant } from "./RestaurantContext";

// Create context
const CartContext = createContext();

/**
 * CartProvider component for managing cart state
 * @param {Object} props - Component props
 * @returns {JSX.Element} CartProvider component
 */
export const CartProvider = ({ children }) => {
    // State for cart items and cart state
    const [cartItems, setCartItems] = useState([]);
    const [cartState, setCartState] = useState({});
    const [cartRestaurant, setCartRestaurant] = useState(null);
    const [promoCode, setPromoCode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get auth and restaurant context
    const { isAuthenticated, user } = useAuth();
    const { currentRestaurant } = useRestaurant();

    // Load cart data from storage on mount
    useEffect(() => {
        const loadCartData = async () => {
            try {
                setLoading(true);
                const storedCartItems = await AsyncStorage.getItem("cartItem");
                const storedCartState = await AsyncStorage.getItem("cartState");

                if (storedCartItems) {
                    setCartItems(JSON.parse(storedCartItems));
                }

                if (storedCartState) {
                    setCartState(JSON.parse(storedCartState));
                }
            } catch (err) {
                console.error("Error loading cart data:", err);
                setError("Failed to load cart data");
            } finally {
                setLoading(false);
            }
        };

        loadCartData();
    }, []);

    // Save cart items to storage whenever they change
    useEffect(() => {
        const saveCartItems = async () => {
            try {
                await AsyncStorage.setItem(
                    "cartItem",
                    JSON.stringify(cartItems)
                );
            } catch (err) {
                console.error("Error saving cart items:", err);
            }
        };

        saveCartItems();
    }, [cartItems]);

    // Save cart state to storage whenever it changes
    useEffect(() => {
        const saveCartState = async () => {
            try {
                await AsyncStorage.setItem(
                    "cartState",
                    JSON.stringify(cartState)
                );
            } catch (err) {
                console.error("Error saving cart state:", err);
            }
        };

        saveCartState();
    }, [cartState]);

    // Add item to cart
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            // Check if item already exists in cart
            const existingItemIndex = prevItems.findIndex(
                (cartItem) => cartItem._id === item._id
            );

            if (existingItemIndex !== -1) {
                // Update existing item
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity:
                        updatedItems[existingItemIndex].quantity +
                        item.quantity,
                };
                return updatedItems;
            } else {
                // Add new item
                return [...prevItems, item];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (itemId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item._id !== itemId)
        );
    };

    // Update item quantity
    const updateQuantity = (itemId, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === itemId ? { ...item, quantity } : item
            )
        );
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
        setCartState({});
    };

    // Update cart state
    const updateCartState = (newState) => {
        setCartState((prevState) => ({ ...prevState, ...newState }));
    };

    // Calculate totals
    const calculateTotals = () => {
        const itemTotal = cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const gstAmount = cartState.gstAmount || 0;
        const deliveryAmount = cartState.deliveryAmount || 0;
        const discountAmount = cartState.discountAmount || 0;

        const amountToBePaid =
            itemTotal + gstAmount + deliveryAmount - discountAmount;

        return {
            itemTotal,
            gstAmount,
            deliveryAmount,
            discountAmount,
            amountToBePaid,
        };
    };

    // Context value
    const value = {
        cartItems,
        cartState,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        updateCartState,
        calculateTotals,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

/**
 * Custom hook for using the cart context
 * @returns {Object} Cart context value
 */
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
