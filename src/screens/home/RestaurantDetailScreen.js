import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Share,
  Platform,
} from 'react-native';
import {
  Text,
  Button,
  Chip,
  Divider,
  ActivityIndicator,
  Portal,
  Dialog,
  IconButton,
  SegmentedButtons,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useRestaurant } from '../../context/RestaurantContext';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../constants/theme';
import { LoadingIndicator, ErrorDisplay } from '../../components';

/**
 * RestaurantDetailScreen component for displaying restaurant details
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @param {Object} props.route - Route object
 * @returns {JSX.Element} RestaurantDetailScreen component
 */
const RestaurantDetailScreen = ({ navigation, route }) => {
  // Get restaurant data from route params or context
  const { restaurant: routeRestaurant, restaurantUrl, restaurantId } = route.params || {};
  
  // Get restaurant context
  const {
    currentRestaurant,
    loading,
    error,
    getRestaurantByUrl,
    getRestaurantById,
    getRestaurantMenu,
    getRestaurantReviews,
  } = useRestaurant();
  
  // Get auth context
  const { isAuthenticated, user } = useAuth();
  
  // Local state
  const [restaurant, setRestaurant] = useState(routeRestaurant || currentRestaurant);
  const [activeTab, setActiveTab] = useState('menu');
  const [showCallDialog, setShowCallDialog] = useState(false);
  
  // Load restaurant data if not provided in route params
  useEffect(() => {
    const loadRestaurant = async () => {
      let loadedRestaurant = null;
      
      if (restaurantUrl) {
        loadedRestaurant = await getRestaurantByUrl(restaurantUrl);
      } else if (restaurantId) {
        loadedRestaurant = await getRestaurantById(restaurantId);
      } else if (!restaurant) {
        // If no restaurant data is available, go back
        navigation.goBack();
        return;
      }
      
      if (loadedRestaurant) {
        setRestaurant(loadedRestaurant);
      }
    };
    
    if (!restaurant) {
      loadRestaurant();
    }
  }, [restaurantUrl, restaurantId]);
  
  // Load menu and reviews when restaurant is loaded
  useEffect(() => {
    if (restaurant) {
      getRestaurantMenu(restaurant._id);
      getRestaurantReviews(restaurant._id);
    }
  }, [restaurant]);
  
  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  
  // Handle view menu button press
  const handleViewMenu = () => {
    navigation.navigate('MenuScreen', { restaurant });
  };
  
  // Handle call restaurant button press
  const handleCallRestaurant = () => {
    if (restaurant?.phoneNumber) {
      setShowCallDialog(true);
    }
  };
  
  // Handle call dialog confirm
  const handleCallConfirm = () => {
    setShowCallDialog(false);
    
    if (restaurant?.phoneNumber) {
      Linking.openURL(`tel:${restaurant.phoneNumber}`);
    }
  };
  
  // Handle call dialog dismiss
  const handleCallDismiss = () => {
    setShowCallDialog(false);
  };
  
  // Handle get directions button press
  const handleGetDirections = () => {
    if (restaurant?.location?.coordinates) {
      const { coordinates } = restaurant.location;
      const url = Platform.select({
        ios: `maps:0,0?q=${coordinates[1]},${coordinates[0]}`,
        android: `geo:0,0?q=${coordinates[1]},${coordinates[0]}`,
      });
      
      Linking.openURL(url);
    }
  };
  
  // Handle share button press
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out ${restaurant.restaurantName} on QRSay!`,
        url: `https://qrsay.com/restaurant/${restaurant.restaurantUrl}`,
      });
    } catch (error) {
      console.error('Error sharing restaurant:', error);
    }
  };
  
  // Render loading state
  if (loading && !restaurant) {
    return <LoadingIndicator fullScreen message="Loading restaurant details..." />;
  }
  
  // Render error state
  if (error && !restaurant) {
    return (
      <ErrorDisplay
        message="Failed to load restaurant details. Please try again."
        onRetry={() => {
          if (restaurantUrl) {
            getRestaurantByUrl(restaurantUrl);
          } else if (restaurantId) {
            getRestaurantById(restaurantId);
          }
        }}
        fullScreen
      />
    );
  }
  
  // Render restaurant details
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Restaurant Header */}
        <View style={styles.header}>
          <Image
            source={
              restaurant?.restaurantBackgroundImage
                ? { uri: restaurant.restaurantBackgroundImage }
                : require('../../assets/restaurant-placeholder.png')
            }
            style={styles.headerImage}
            resizeMode="cover"
          />
          
          <View style={styles.overlay}>
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{restaurant?.restaurantName}</Text>
              
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusIndicator,
                    {
                      backgroundColor:
                        restaurant?.restaurantStatus === 'online'
                          ? '#4CAF50'
                          : '#F44336',
                    },
                  ]}
                />
                <Text style={styles.statusText}>
                  {restaurant?.restaurantStatus === 'online' ? 'Open' : 'Closed'}
                </Text>
              </View>
              
              <View style={styles.cuisineContainer}>
                {restaurant?.cuisine?.map((item, index) => (
                  <Chip
                    key={index}
                    style={styles.cuisineChip}
                    textStyle={styles.cuisineText}
                  >
                    {item.name}
                  </Chip>
                ))}
              </View>
              
              <View style={styles.addressContainer}>
                <Ionicons name="location-outline" size={16} color="white" />
                <Text style={styles.addressText}>
                  {restaurant?.address?.street}, {restaurant?.address?.city}
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            icon="menu"
            onPress={handleViewMenu}
            style={styles.actionButton}
          >
            View Menu
          </Button>
          
          <View style={styles.iconButtonsContainer}>
            {restaurant?.phoneNumber && (
              <IconButton
                icon="phone"
                mode="contained"
                size={20}
                onPress={handleCallRestaurant}
                style={styles.iconButton}
              />
            )}
            
            <IconButton
              icon="map-marker"
              mode="contained"
              size={20}
              onPress={handleGetDirections}
              style={styles.iconButton}
            />
            
            <IconButton
              icon="share-variant"
              mode="contained"
              size={20}
              onPress={handleShare}
              style={styles.iconButton}
            />
          </View>
        </View>
        
        <Divider style={styles.divider} />
        
        {/* Tabs */}
        <SegmentedButtons
          value={activeTab}
          onValueChange={handleTabChange}
          buttons={[
            { value: 'menu', label: 'Menu' },
            { value: 'info', label: 'Info' },
            { value: 'reviews', label: 'Reviews' },
          ]}
          style={styles.tabs}
        />
        
        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'menu' && (
            <View>
              <Text style={styles.sectionTitle}>Popular Items</Text>
              {/* Popular items will be implemented in MenuScreen */}
              <Button
                mode="outlined"
                onPress={handleViewMenu}
                style={styles.viewAllButton}
              >
                View Full Menu
              </Button>
            </View>
          )}
          
          {activeTab === 'info' && (
            <View>
              <Text style={styles.sectionTitle}>Restaurant Information</Text>
              
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Services</Text>
                <View style={styles.servicesContainer}>
                  {restaurant?.provideDelivery && (
                    <View style={styles.serviceItem}>
                      <Ionicons
                        name="bicycle-outline"
                        size={20}
                        color={theme.colors.text}
                      />
                      <Text style={styles.serviceText}>Delivery</Text>
                    </View>
                  )}
                  
                  {restaurant?.provideTakeAway && (
                    <View style={styles.serviceItem}>
                      <Ionicons
                        name="bag-outline"
                        size={20}
                        color={theme.colors.text}
                      />
                      <Text style={styles.serviceText}>Takeaway</Text>
                    </View>
                  )}
                  
                  {restaurant?.provideDineIn && (
                    <View style={styles.serviceItem}>
                      <Ionicons
                        name="restaurant-outline"
                        size={20}
                        color={theme.colors.text}
                      />
                      <Text style={styles.serviceText}>Dine-in</Text>
                    </View>
                  )}
                </View>
              </View>
              
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Contact</Text>
                {restaurant?.phoneNumber ? (
                  <TouchableOpacity
                    style={styles.contactItem}
                    onPress={handleCallRestaurant}
                  >
                    <Ionicons
                      name="call-outline"
                      size={20}
                      color={theme.colors.text}
                    />
                    <Text style={styles.contactText}>{restaurant.phoneNumber}</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.noInfoText}>No contact information available</Text>
                )}
              </View>
              
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Address</Text>
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={handleGetDirections}
                >
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={theme.colors.text}
                  />
                  <Text style={styles.contactText}>
                    {restaurant?.address?.street}, {restaurant?.address?.city}
                  </Text>
                </TouchableOpacity>
              </View>
              
              {restaurant?.openingHours && (
                <View style={styles.infoSection}>
                  <Text style={styles.infoTitle}>Opening Hours</Text>
                  {Object.entries(restaurant.openingHours).map(([day, hours]) => (
                    <View key={day} style={styles.hoursItem}>
                      <Text style={styles.dayText}>{day}</Text>
                      <Text style={styles.hoursText}>{hours}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
          
          {activeTab === 'reviews' && (
            <View>
              <Text style={styles.sectionTitle}>Customer Reviews</Text>
              {loading ? (
                <ActivityIndicator style={styles.loadingIndicator} />
              ) : (
                <View>
                  {/* Reviews will be implemented later */}
                  <Text style={styles.noReviewsText}>No reviews yet</Text>
                  
                  {isAuthenticated ? (
                    <Button
                      mode="outlined"
                      icon="star-outline"
                      onPress={() => {
                        // Navigate to review form
                      }}
                      style={styles.writeReviewButton}
                    >
                      Write a Review
                    </Button>
                  ) : (
                    <Text style={styles.loginPrompt}>
                      Please login to write a review
                    </Text>
                  )}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      
      {/* Call Dialog */}
      <Portal>
        <Dialog visible={showCallDialog} onDismiss={handleCallDismiss}>
          <Dialog.Title>Call Restaurant</Dialog.Title>
          <Dialog.Content>
            <Text>Would you like to call {restaurant?.restaurantName}?</Text>
            <Text style={styles.phoneNumber}>{restaurant?.phoneNumber}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCallDismiss}>Cancel</Button>
            <Button onPress={handleCallConfirm}>Call</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    position: 'relative',
    height: 200,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  restaurantInfo: {
    width: '100%',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
  },
  cuisineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  cuisineChip: {
    marginRight: 4,
    marginBottom: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  cuisineText: {
    color: 'white',
    fontSize: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  actionButton: {
    flex: 1,
    marginRight: 8,
  },
  iconButtonsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    margin: 0,
    marginLeft: 8,
  },
  divider: {
    marginHorizontal: 16,
  },
  tabs: {
    margin: 16,
  },
  tabContent: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  viewAllButton: {
    marginTop: 16,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.primary,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  serviceText: {
    marginLeft: 8,
    fontSize: 14,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    marginLeft: 8,
    fontSize: 14,
  },
  noInfoText: {
    fontSize: 14,
    color: theme.colors.placeholder,
    fontStyle: 'italic',
  },
  hoursItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  hoursText: {
    fontSize: 14,
  },
  loadingIndicator: {
    marginVertical: 16,
  },
  noReviewsText: {
    fontSize: 14,
    color: theme.colors.placeholder,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 16,
  },
  writeReviewButton: {
    marginTop: 16,
  },
  loginPrompt: {
    fontSize: 14,
    color: theme.colors.placeholder,
    textAlign: 'center',
    marginTop: 16,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default RestaurantDetailScreen;
