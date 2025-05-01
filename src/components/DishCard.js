import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph, Button, Badge } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { truncateText, formatCurrency } from '../utils/helpers';

/**
 * DishCard component for displaying dish information
 * @param {Object} props - Component props
 * @param {Object} props.dish - Dish data
 * @param {Function} props.onPress - Function to call when card is pressed
 * @param {Function} props.onAddToCart - Function to call when add to cart button is pressed
 * @param {boolean} props.isAvailable - Whether the dish is available
 * @param {boolean} props.isRestaurantOpen - Whether the restaurant is open
 * @returns {JSX.Element} DishCard component
 */
const DishCard = ({
  dish,
  onPress,
  onAddToCart,
  isAvailable = true,
  isRestaurantOpen = true,
}) => {
  if (!dish) return null;

  const {
    dishName,
    dishImage,
    dishType,
    price,
    description,
    availableFlag,
  } = dish;

  // Check if dish is available
  const isDishAvailable = isAvailable && availableFlag && isRestaurantOpen;

  // Default image if none provided
  const imageSource = dishImage
    ? { uri: dishImage }
    : require('../assets/logo.png');

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={!isDishAvailable}
    >
      <Card style={[styles.card, !isDishAvailable && styles.disabledCard]}>
        <View style={styles.cardContent}>
          <View style={styles.infoContainer}>
            <View style={styles.typeContainer}>
              <View
                style={[
                  styles.typeBadge,
                  {
                    backgroundColor:
                      dishType === 'veg'
                        ? theme.colors.success
                        : theme.colors.error,
                  },
                ]}
              />
              <Title style={styles.title}>{truncateText(dishName, 25)}</Title>
            </View>
            <Paragraph style={styles.price}>
              {formatCurrency(price)}
            </Paragraph>
            <Paragraph style={styles.description}>
              {truncateText(description, 80)}
            </Paragraph>
            {!isDishAvailable && (
              <Badge style={styles.unavailableBadge}>
                {!isRestaurantOpen
                  ? 'Restaurant Closed'
                  : !availableFlag
                  ? 'Currently Unavailable'
                  : 'Unavailable'}
              </Badge>
            )}
          </View>
          <View style={styles.imageContainer}>
            <Image source={imageSource} style={styles.image} />
            {isDishAvailable && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={(e) => {
                  e.stopPropagation();
                  onAddToCart && onAddToCart(dish);
                }}
              >
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: theme.colors.surface,
  },
  disabledCard: {
    opacity: 0.7,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  typeBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: theme.colors.text,
  },
  imageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  unavailableBadge: {
    backgroundColor: theme.colors.error,
    color: 'white',
    marginTop: 8,
    alignSelf: 'flex-start',
  },
});

export default DishCard;
