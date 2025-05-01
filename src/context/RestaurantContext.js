import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as restaurantService from "../services/restaurantService";
import { useAuth } from "./AuthContext";

// Create context
const RestaurantContext = createContext();

/**
 * RestaurantProvider component for managing restaurant data
 * @param {Object} props - Component props
 * @returns {JSX.Element} RestaurantProvider component
 */
export const RestaurantProvider = ({ children }) => {
    // State for restaurant data
    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    const [recentRestaurants, setRecentRestaurants] = useState([]);
    const [popularRestaurants, setPopularRestaurants] = useState([]);
    const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [menu, setMenu] = useState([]);
    const [categories, setCategories] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get auth context
    const { user, isAuthenticated } = useAuth();

    // Load recent restaurants from storage on mount
    useEffect(() => {
        loadRecentRestaurants();
    }, []);

    /**
     * Load recent restaurants from storage
     */
    const loadRecentRestaurants = async () => {
        try {
            const recentRestaurantsData = await AsyncStorage.getItem(
                "recentRestaurants"
            );
            if (recentRestaurantsData) {
                setRecentRestaurants(JSON.parse(recentRestaurantsData));
            }
        } catch (error) {
            console.error("Error loading recent restaurants:", error);
        }
    };

    /**
     * Save recent restaurants to storage
     * @param {Array} restaurants - Recent restaurants
     */
    const saveRecentRestaurants = async (restaurants) => {
        try {
            await AsyncStorage.setItem(
                "recentRestaurants",
                JSON.stringify(restaurants)
            );
        } catch (error) {
            console.error("Error saving recent restaurants:", error);
        }
    };

    /**
     * Add restaurant to recent restaurants
     * @param {Object} restaurant - Restaurant to add
     */
    const addToRecentRestaurants = (restaurant) => {
        if (!restaurant) return;

        setRecentRestaurants((prevRestaurants) => {
            // Remove restaurant if it already exists
            const filteredRestaurants = prevRestaurants.filter(
                (r) => r._id !== restaurant._id
            );

            // Add restaurant to the beginning of the array
            const updatedRestaurants = [
                restaurant,
                ...filteredRestaurants,
            ].slice(0, 10);

            // Save to storage
            saveRecentRestaurants(updatedRestaurants);

            return updatedRestaurants;
        });
    };

    /**
     * Get restaurant by URL
     * @param {string} restaurantUrl - Restaurant URL
     * @returns {Promise<Object>} Restaurant data
     */
    const getRestaurantByUrl = async (restaurantUrl) => {
        try {
            setLoading(true);
            setError(null);

            const response = await restaurantService.getRestaurantFromUrl(
                restaurantUrl
            );

            if (response && response.data) {
                setCurrentRestaurant(response.data);
                addToRecentRestaurants(response.data);

                // Store restaurant in user's history if authenticated
                if (isAuthenticated && user) {
                    await restaurantService.storeRestaurant({
                        restaurantId: response.data._id,
                        email: user.email,
                    });
                }

                return response.data;
            }

            throw new Error("Invalid response format");
        } catch (error) {
            console.error("Get restaurant by URL error:", error);
            setError(error.message || "Failed to get restaurant");
            return null;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Get restaurant by ID
     * @param {string} restaurantId - Restaurant ID
     * @returns {Promise<Object>} Restaurant data
     */
    const getRestaurantById = async (restaurantId) => {
        try {
            setLoading(true);
            setError(null);

            const response = await restaurantService.getRestaurantById(
                restaurantId
            );

            if (response && response.data) {
                setCurrentRestaurant(response.data);
                addToRecentRestaurants(response.data);
                return response.data;
            }

            throw new Error("Invalid response format");
        } catch (error) {
            console.error("Get restaurant by ID error:", error);
            setError(error.message || "Failed to get restaurant");
            return null;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Get all restaurants
     * @returns {Promise<Array>} All restaurants
     */
    const getAllRestaurants = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await restaurantService.getAllRestaurants();

            if (response && response.data) {
                setAllRestaurants(response.data);
                return response.data;
            }

            throw new Error("Invalid response format");
        } catch (error) {
            console.error("Get all restaurants error:", error);
            setError(error.message || "Failed to get restaurants");
            return [];
        } finally {
            setLoading(false);
        }
    };

    /**
     * Get nearby restaurants
     * @param {Object} location - User location
     * @param {number} location.latitude - Latitude
     * @param {number} location.longitude - Longitude
     * @returns {Promise<Array>} Nearby restaurants
     */
    const getNearbyRestaurants = async (location) => {
        try {
            setLoading(true);
            setError(null);

            const response = await restaurantService.getNearbyRestaurants(
                location
            );

            if (response && response.data) {
                setNearbyRestaurants(response.data);
                return response.data;
            }

            throw new Error("Invalid response format");
        } catch (error) {
            console.error("Get nearby restaurants error:", error);
            setError(error.message || "Failed to get nearby restaurants");
            return [];
        } finally {
            setLoading(false);
        }
    };

    /**
     * Search restaurants
     * @param {string} query - Search query
     * @returns {Promise<Array>} Search results
     */
    const searchRestaurants = async (query) => {
        try {
            setLoading(true);
            setError(null);

            const response = await restaurantService.searchRestaurants(query);

            if (response && response.data) {
                return response.data;
            }

            throw new Error("Invalid response format");
        } catch (error) {
            console.error("Search restaurants error:", error);
            setError(error.message || "Failed to search restaurants");
            return [];
        } finally {
            setLoading(false);
        }
    };

    /**
     * Get restaurant menu
     * @param {string} restaurantId - Restaurant ID
     * @returns {Promise<Array>} Menu data
     */
    const getRestaurantMenu = async (restaurantId) => {
        try {
            setLoading(true);
            setError(null);

            // This is a placeholder since the actual API endpoint might not exist
            // In a real app, you would call the actual API endpoint
            // const response = await menuService.getMenu(restaurantId);

            // Simulate API call success with mock data
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const mockMenu = [
                {
                    categoryId: "1",
                    categoryName: "Starters",
                    items: [
                        {
                            _id: "101",
                            dishName: "Paneer Tikka",
                            dishImage: "https://example.com/paneer-tikka.jpg",
                            dishType: "veg",
                            price: 250,
                            description:
                                "Marinated cottage cheese grilled to perfection",
                            availableFlag: true,
                        },
                        {
                            _id: "102",
                            dishName: "Chicken Tikka",
                            dishImage: "https://example.com/chicken-tikka.jpg",
                            dishType: "nonVeg",
                            price: 300,
                            description:
                                "Marinated chicken pieces grilled in tandoor",
                            availableFlag: true,
                        },
                    ],
                },
                {
                    categoryId: "2",
                    categoryName: "Main Course",
                    items: [
                        {
                            _id: "201",
                            dishName: "Butter Chicken",
                            dishImage: "https://example.com/butter-chicken.jpg",
                            dishType: "nonVeg",
                            price: 350,
                            description:
                                "Chicken in rich tomato and butter gravy",
                            availableFlag: true,
                        },
                        {
                            _id: "202",
                            dishName: "Paneer Butter Masala",
                            dishImage:
                                "https://example.com/paneer-butter-masala.jpg",
                            dishType: "veg",
                            price: 300,
                            description:
                                "Cottage cheese in rich tomato and butter gravy",
                            availableFlag: true,
                        },
                    ],
                },
            ];

            setMenu(mockMenu);

            // Extract categories from menu
            const extractedCategories = mockMenu.map((category) => ({
                id: category.categoryId,
                name: category.categoryName,
            }));

            setCategories(extractedCategories);

            return mockMenu;
        } catch (error) {
            console.error("Get restaurant menu error:", error);
            setError(error.message || "Failed to get menu");
            return [];
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch restaurant reviews
     * @param {string} restaurantId - Restaurant ID
     * @returns {Promise<Array>} Reviews data
     */
    const getRestaurantReviews = async (restaurantId) => {
        try {
            setLoading(true);
            setError(null);

            const response = await restaurantService.getRestaurantReviews(
                restaurantId
            );

            if (response && response.data) {
                setReviews(response.data);
                return response.data;
            }

            throw new Error("Invalid response format");
        } catch (error) {
            console.error("Get restaurant reviews error:", error);
            setError(error.message || "Failed to get reviews");
            return [];
        } finally {
            setLoading(false);
        }
    };

    /**
     * Search dishes in menu
     * @param {string} query - Search query
     * @returns {Array} Search results
     */
    const searchDishes = (query) => {
        if (!query || !menu.length) return [];

        const lowerCaseQuery = query.toLowerCase();

        return menu.reduce((results, category) => {
            const matchingDishes = category.items.filter(
                (dish) =>
                    dish.dishName.toLowerCase().includes(lowerCaseQuery) ||
                    (dish.description &&
                        dish.description.toLowerCase().includes(lowerCaseQuery))
            );

            if (matchingDishes.length) {
                results.push({
                    categoryId: category.categoryId,
                    categoryName: category.categoryName,
                    items: matchingDishes,
                });
            }

            return results;
        }, []);
    };

    /**
     * Filter dishes by type
     * @param {string} type - Dish type ('veg', 'nonVeg', 'all')
     * @returns {Array} Filtered menu
     */
    const filterDishesByType = (type) => {
        if (!menu.length || type === "all") return menu;

        return menu.reduce((results, category) => {
            const filteredDishes = category.items.filter(
                (dish) => dish.dishType === type
            );

            if (filteredDishes.length) {
                results.push({
                    categoryId: category.categoryId,
                    categoryName: category.categoryName,
                    items: filteredDishes,
                });
            }

            return results;
        }, []);
    };

    // Context value
    const value = {
        currentRestaurant,
        recentRestaurants,
        popularRestaurants,
        nearbyRestaurants,
        allRestaurants,
        menu,
        categories,
        reviews,
        loading,
        error,
        setCurrentRestaurant,
        getRestaurantByUrl,
        getRestaurantById,
        getAllRestaurants,
        getNearbyRestaurants,
        searchRestaurants,
        getRestaurantMenu,
        getRestaurantReviews,
        searchDishes,
        filterDishesByType,
    };

    return (
        <RestaurantContext.Provider value={value}>
            {children}
        </RestaurantContext.Provider>
    );
};

/**
 * Custom hook for using the restaurant context
 * @returns {Object} Restaurant context value
 */
export const useRestaurant = () => {
    const context = useContext(RestaurantContext);
    if (context === undefined) {
        throw new Error(
            "useRestaurant must be used within a RestaurantProvider"
        );
    }
    return context;
};
