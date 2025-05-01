import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { truncateText, formatCurrency } from '../utils/helpers';

/**
 * RestaurantCard component for displaying restaurant information
 * @param {Object} props - Component props
 * @param {Object} props.restaurant - Restaurant data
 * @param {Function} props.onPress - Function to call when card is pressed
 * @returns {JSX.Element} RestaurantCard component
 */
const RestaurantCard = ({ restaurant, onPress }) => {
  if (!restaurant) return null;

  const {
    restaurantName,
    restaurantBackgroundImage,
    restaurantStatus,
    cuisine = [],
    address = {},
  } = restaurant;

  // Default image if none provided
  const imageSource = restaurantBackgroundImage
    ? { uri: restaurantBackgroundImage }
    : require('../assets/logo.png');

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  restaurantStatus === 'online'
                    ? theme.colors.success
                    : theme.colors.error,
              },
            ]}
          >
            <Paragraph style={styles.statusText}>
              {restaurantStatus === 'online' ? 'Open' : 'Closed'}
            </Paragraph>
          </View>
        </View>
        <Card.Content style={styles.content}>
          <Title style={styles.title}>{truncateText(restaurantName, 25)}</Title>
          <View style={styles.locationContainer}>
            <Ionicons
              name="location-outline"
              size={16}
              color={theme.colors.primary}
            />
            <Paragraph style={styles.location}>
              {truncateText(
                `${address.street || ''}, ${address.city || ''}`,
                30
              )}
            </Paragraph>
          </View>
          <View style={styles.cuisineContainer}>
            {cuisine.slice(0, 3).map((item, index) => (
              <Chip
                key={index}
                style={styles.cuisineChip}
                textStyle={styles.cuisineText}
              >
                {item.name}
              </Chip>
            ))}
            {cuisine.length > 3 && (
              <Chip style={styles.cuisineChip} textStyle={styles.cuisineText}>
                +{cuisine.length - 3}
              </Chip>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: theme.colors.surface,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: theme.colors.text,
    marginLeft: 4,
  },
  cuisineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cuisineChip: {
    backgroundColor: theme.colors.primary + '20',
    marginRight: 8,
    marginBottom: 4,
    height: 24,
  },
  cuisineText: {
    fontSize: 12,
    color: theme.colors.primary,
  },
});

export default RestaurantCard;
