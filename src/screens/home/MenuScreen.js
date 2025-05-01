import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SectionList,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from 'react-native';
import {
  Text,
  Searchbar,
  Chip,
  Divider,
  Button,
  ActivityIndicator,
  Badge,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useRestaurant } from '../../context/RestaurantContext';
import { useCart } from '../../context/CartContext';
import { theme } from '../../constants/theme';
import { LoadingIndicator, ErrorDisplay, DishCard } from '../../components';

/**
 * MenuScreen component for displaying restaurant menu
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @param {Object} props.route - Route object
 * @returns {JSX.Element} MenuScreen component
 */
const MenuScreen = ({ navigation, route }) => {
  // Get restaurant data from route params
  const { restaurant } = route.params || {};
  
  // Get restaurant context
  const {
    currentRestaurant,
    menu,
    categories,
    loading,
    error,
    getRestaurantMenu,
    searchDishes,
    filterDishesByType,
  } = useRestaurant();
  
  // Get cart context
  const { cartItems, addToCart, updateCartItem, removeFromCart } = useCart();
  
  // Local state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);
  
  // Refs
  const sectionListRef = useRef(null);
  const categoryListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Load menu when component mounts
  useEffect(() => {
    loadMenu();
  }, []);
  
  // Update filtered menu when menu, search query, or filter changes
  useEffect(() => {
    filterMenu();
  }, [menu, searchQuery, selectedFilter, selectedCategory]);
  
  // Load menu
  const loadMenu = async () => {
    if (restaurant?._id || currentRestaurant?._id) {
      await getRestaurantMenu(restaurant?._id || currentRestaurant?._id);
    }
  };
  
  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadMenu();
    setRefreshing(false);
  };
  
  // Filter menu based on search query, category, and filter
  const filterMenu = () => {
    let filtered = menu;
    
    // Apply search filter
    if (searchQuery) {
      filtered = searchDishes(searchQuery);
    }
    
    // Apply dish type filter
    if (selectedFilter !== 'all') {
      filtered = filterDishesByType(selectedFilter);
    }
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (category) => category.categoryId === selectedCategory
      );
    }
    
    setFilteredMenu(filtered);
  };
  
  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  // Handle filter selection
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };
  
  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    
    // Scroll to selected category
    if (sectionListRef.current && categoryId) {
      const sectionIndex = menu.findIndex(
        (section) => section.categoryId === categoryId
      );
      
      if (sectionIndex !== -1) {
        sectionListRef.current.scrollToLocation({
          sectionIndex,
          itemIndex: 0,
          animated: true,
        });
      }
    }
    
    // Hide category list
    setShowCategoryList(false);
  };
  
  // Handle dish selection
  const handleDishSelect = (dish) => {
    navigation.navigate('DishDetail', { dish });
  };
  
  // Handle add to cart
  const handleAddToCart = (dish) => {
    addToCart({
      ...dish,
      quantity: 1,
      restaurantId: restaurant?._id || currentRestaurant?._id,
      restaurantName: restaurant?.restaurantName || currentRestaurant?.restaurantName,
    });
  };
  
  // Handle update cart item
  const handleUpdateCartItem = (dish, quantity) => {
    updateCartItem(dish._id, quantity);
  };
  
  // Handle remove from cart
  const handleRemoveFromCart = (dishId) => {
    removeFromCart(dishId);
  };
  
  // Get dish quantity in cart
  const getDishQuantityInCart = (dishId) => {
    const cartItem = cartItems.find((item) => item._id === dishId);
    return cartItem ? cartItem.quantity : 0;
  };
  
  // Render category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategoryItem,
      ]}
      onPress={() => handleCategorySelect(item.id)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  
  // Render dish item
  const renderDishItem = ({ item }) => (
    <DishCard
      dish={item}
      onPress={() => handleDishSelect(item)}
      onAddToCart={() => handleAddToCart(item)}
      onUpdateCartItem={(quantity) => handleUpdateCartItem(item, quantity)}
      onRemoveFromCart={() => handleRemoveFromCart(item._id)}
      quantity={getDishQuantityInCart(item._id)}
    />
  );
  
  // Render section header
  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.categoryName}</Text>
      <Text style={styles.itemCount}>{section.items.length} items</Text>
    </View>
  );
  
  // Render loading state
  if (loading && !refreshing && !menu.length) {
    return <LoadingIndicator fullScreen message="Loading menu..." />;
  }
  
  // Render error state
  if (error && !menu.length) {
    return (
      <ErrorDisplay
        message="Failed to load menu. Please try again."
        onRetry={loadMenu}
        fullScreen
      />
    );
  }
  
  // Render menu
  return (
    <View style={styles.container}>
      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search dishes"
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
          icon={() => <Ionicons name="search" size={20} color={theme.colors.primary} />}
          clearIcon={() => <Ionicons name="close" size={20} color={theme.colors.primary} />}
        />
        
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Chip
              selected={selectedFilter === 'all'}
              onPress={() => handleFilterSelect('all')}
              style={[
                styles.filterChip,
                selectedFilter === 'all' && styles.selectedFilterChip,
              ]}
              textStyle={
                selectedFilter === 'all'
                  ? styles.selectedFilterText
                  : styles.filterText
              }
            >
              All
            </Chip>
            <Chip
              selected={selectedFilter === 'veg'}
              onPress={() => handleFilterSelect('veg')}
              style={[
                styles.filterChip,
                selectedFilter === 'veg' && styles.selectedFilterChip,
              ]}
              textStyle={
                selectedFilter === 'veg'
                  ? styles.selectedFilterText
                  : styles.filterText
              }
            >
              Vegetarian
            </Chip>
            <Chip
              selected={selectedFilter === 'nonVeg'}
              onPress={() => handleFilterSelect('nonVeg')}
              style={[
                styles.filterChip,
                selectedFilter === 'nonVeg' && styles.selectedFilterChip,
              ]}
              textStyle={
                selectedFilter === 'nonVeg'
                  ? styles.selectedFilterText
                  : styles.filterText
              }
            >
              Non-Vegetarian
            </Chip>
          </ScrollView>
        </View>
      </View>
      
      <Divider />
      
      {/* Categories Button */}
      <TouchableOpacity
        style={styles.categoriesButton}
        onPress={() => setShowCategoryList(!showCategoryList)}
      >
        <Text style={styles.categoriesButtonText}>
          {selectedCategory
            ? categories.find((c) => c.id === selectedCategory)?.name || 'Categories'
            : 'Categories'}
        </Text>
        <Ionicons
          name={showCategoryList ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={theme.colors.text}
        />
      </TouchableOpacity>
      
      {/* Categories List */}
      {showCategoryList && (
        <FlatList
          ref={categoryListRef}
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
          contentContainerStyle={styles.categoriesListContent}
        />
      )}
      
      {/* Menu List */}
      {filteredMenu.length > 0 ? (
        <SectionList
          ref={sectionListRef}
          sections={filteredMenu}
          renderItem={renderDishItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item) => item._id}
          stickySectionHeadersEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[theme.colors.primary]}
            />
          }
          contentContainerStyle={styles.menuListContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="restaurant-outline" size={64} color={theme.colors.disabled} />
          <Text style={styles.emptyText}>No dishes found</Text>
          {searchQuery || selectedFilter !== 'all' || selectedCategory ? (
            <Button
              mode="outlined"
              onPress={() => {
                setSearchQuery('');
                setSelectedFilter('all');
                setSelectedCategory(null);
              }}
              style={styles.clearFiltersButton}
            >
              Clear Filters
            </Button>
          ) : (
            <Button
              mode="outlined"
              onPress={handleRefresh}
              style={styles.refreshButton}
            >
              Refresh
            </Button>
          )}
        </View>
      )}
      
      {/* Cart Button */}
      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <View style={styles.cartButtonContent}>
            <Ionicons name="cart" size={24} color="white" />
            <Text style={styles.cartButtonText}>View Cart</Text>
          </View>
          <Badge style={styles.cartBadge}>
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </Badge>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  searchBar: {
    marginBottom: 16,
    backgroundColor: theme.colors.background,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterChip: {
    marginRight: 8,
    backgroundColor: theme.colors.surface,
  },
  selectedFilterChip: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    color: theme.colors.text,
  },
  selectedFilterText: {
    color: 'white',
  },
  categoriesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: theme.colors.surface,
  },
  categoriesButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesList: {
    backgroundColor: theme.colors.surface,
    maxHeight: 50,
  },
  categoriesListContent: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
  },
  selectedCategoryItem: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  selectedCategoryText: {
    color: 'white',
  },
  menuListContent: {
    paddingBottom: 80,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemCount: {
    fontSize: 14,
    color: theme.colors.placeholder,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.placeholder,
    marginTop: 16,
    marginBottom: 24,
  },
  clearFiltersButton: {
    marginTop: 16,
  },
  refreshButton: {
    marginTop: 16,
  },
  cartButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    elevation: 4,
  },
  cartButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cartBadge: {
    backgroundColor: 'white',
    color: theme.colors.primary,
  },
});

export default MenuScreen;
