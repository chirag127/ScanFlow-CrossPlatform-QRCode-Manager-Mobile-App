import React, { createContext, useState, useContext } from 'react';

// Create context
const RestaurantContext = createContext();

/**
 * RestaurantProvider component for managing restaurant data
 * @param {Object} props - Component props
 * @returns {JSX.Element} RestaurantProvider component
 */
export const RestaurantProvider = ({ children }) => {
  // State for current restaurant and menu
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set current restaurant
  const setRestaurant = (restaurant) => {
    setCurrentRestaurant(restaurant);
  };

  // Fetch restaurant menu
  const fetchMenu = async (restaurantId) => {
    try {
      setLoading(true);
      setError(null);
      
      // This will be implemented in the next phase
      console.log('Fetching menu for restaurant:', restaurantId);
      
      // Placeholder for menu data
      setMenu([]);
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError('Failed to fetch menu');
    } finally {
      setLoading(false);
    }
  };

  // Fetch restaurant reviews
  const fetchReviews = async (restaurantId) => {
    try {
      setLoading(true);
      setError(null);
      
      // This will be implemented in the next phase
      console.log('Fetching reviews for restaurant:', restaurantId);
      
      // Placeholder for reviews data
      setReviews([]);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  // Search dishes in menu
  const searchDishes = (query) => {
    if (!query || !menu.length) return [];
    
    const lowerCaseQuery = query.toLowerCase();
    
    return menu.reduce((results, category) => {
      const matchingDishes = category.items.filter((dish) =>
        dish.dishName.toLowerCase().includes(lowerCaseQuery)
      );
      
      if (matchingDishes.length) {
        results.push({
          categoryName: category.categoryName,
          items: matchingDishes,
        });
      }
      
      return results;
    }, []);
  };

  // Context value
  const value = {
    currentRestaurant,
    menu,
    reviews,
    loading,
    error,
    setRestaurant,
    fetchMenu,
    fetchReviews,
    searchDishes,
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
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
