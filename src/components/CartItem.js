import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { truncateText, formatCurrency } from '../utils/helpers';

/**
 * CartItem component for displaying items in the cart
 * @param {Object} props - Component props
 * @param {Object} props.item - Cart item data
 * @param {Function} props.onIncrement - Function to call when increment button is pressed
 * @param {Function} props.onDecrement - Function to call when decrement button is pressed
 * @param {Function} props.onRemove - Function to call when remove button is pressed
 * @returns {JSX.Element} CartItem component
 */
const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
  if (!item) return null;

  const {
    dishName,
    dishImage,
    dishType,
    price,
    quantity,
    extraIngredients = [],
    variantName,
  } = item;

  // Calculate total price for this item
  const totalPrice = price * quantity;

  // Default image if none provided
  const imageSource = dishImage
    ? { uri: dishImage }
    : require('../assets/logo.png');

  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
          <View
            style={[
              styles.typeBadge,
              {
                backgroundColor:
                  dishType === 'veg' ? theme.colors.success : theme.colors.error,
              },
            ]}
          />
        </View>
        <View style={styles.infoContainer}>
          <Title style={styles.title}>{truncateText(dishName, 25)}</Title>
          {variantName && (
            <Paragraph style={styles.variant}>{variantName}</Paragraph>
          )}
          {extraIngredients.length > 0 && (
            <Paragraph style={styles.extras}>
              {extraIngredients
                .map((extra) => extra.ingredientName)
                .join(', ')}
            </Paragraph>
          )}
          <View style={styles.priceContainer}>
            <Paragraph style={styles.price}>
              {formatCurrency(totalPrice)}
            </Paragraph>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={onDecrement}
              >
                <Ionicons
                  name="remove"
                  size={16}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
              <Paragraph style={styles.quantity}>{quantity}</Paragraph>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={onIncrement}
              >
                <Ionicons name="add" size={16} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <IconButton
          icon="close"
          size={20}
          color={theme.colors.error}
          style={styles.removeButton}
          onPress={onRemove}
        />
      </View>
    </Card>
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
  cardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  imageContainer: {
    position: 'relative',
    width: 70,
    height: 70,
    marginRight: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  typeBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  variant: {
    fontSize: 12,
    color: theme.colors.text,
    marginBottom: 2,
  },
  extras: {
    fontSize: 12,
    color: theme.colors.text,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    paddingHorizontal: 4,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  quantity: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  removeButton: {
    margin: 0,
    alignSelf: 'flex-start',
  },
});

export default CartItem;
