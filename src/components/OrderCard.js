import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Chip, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { formatDate, formatCurrency, truncateText } from '../utils/helpers';

/**
 * OrderCard component for displaying order information
 * @param {Object} props - Component props
 * @param {Object} props.order - Order data
 * @param {Function} props.onPress - Function to call when card is pressed
 * @returns {JSX.Element} OrderCard component
 */
const OrderCard = ({ order, onPress }) => {
  if (!order) return null;

  const {
    orderId,
    orderStatus,
    createdAt,
    orderDetails,
    restaurantName,
    customerPreferences,
    paymentStatus,
  } = order;

  // Get order summary from first item in orderDetails array
  const orderSummary = orderDetails && orderDetails.length > 0 ? orderDetails[0] : {};
  
  // Get total amount
  const totalAmount = orderSummary.orderAmount || 0;
  
  // Get order type
  const orderType = customerPreferences?.preference || 'N/A';
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return theme.colors.warning;
      case 'processing':
        return theme.colors.info;
      case 'completed':
        return theme.colors.success;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.text;
    }
  };

  // Get payment status color
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return theme.colors.success;
      case 'pending':
        return theme.colors.warning;
      case 'failed':
        return theme.colors.error;
      default:
        return theme.colors.text;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <View>
              <Title style={styles.orderId}>#{orderId}</Title>
              <Paragraph style={styles.date}>
                {formatDate(createdAt)}
              </Paragraph>
            </View>
            <Chip
              style={[
                styles.statusChip,
                { backgroundColor: getStatusColor(orderStatus) + '20' },
              ]}
              textStyle={{ color: getStatusColor(orderStatus) }}
            >
              {orderStatus?.toUpperCase()}
            </Chip>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.restaurantContainer}>
            <Ionicons
              name="restaurant-outline"
              size={16}
              color={theme.colors.primary}
              style={styles.icon}
            />
            <Paragraph style={styles.restaurantName}>
              {truncateText(restaurantName, 30)}
            </Paragraph>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons
                name="pricetag-outline"
                size={16}
                color={theme.colors.text}
                style={styles.icon}
              />
              <Paragraph style={styles.detailText}>
                {formatCurrency(totalAmount)}
              </Paragraph>
            </View>
            
            <View style={styles.detailItem}>
              <Ionicons
                name="cart-outline"
                size={16}
                color={theme.colors.text}
                style={styles.icon}
              />
              <Paragraph style={styles.detailText}>{orderType}</Paragraph>
            </View>
            
            <View style={styles.detailItem}>
              <Ionicons
                name="card-outline"
                size={16}
                color={theme.colors.text}
                style={styles.icon}
              />
              <Chip
                style={[
                  styles.paymentChip,
                  {
                    backgroundColor:
                      getPaymentStatusColor(paymentStatus) + '20',
                  },
                ]}
                textStyle={{ color: getPaymentStatusColor(paymentStatus) }}
              >
                {paymentStatus?.toUpperCase() || 'N/A'}
              </Chip>
            </View>
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
    elevation: 2,
    backgroundColor: theme.colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: theme.colors.text,
  },
  statusChip: {
    height: 28,
  },
  divider: {
    marginVertical: 8,
  },
  restaurantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  icon: {
    marginRight: 4,
  },
  detailText: {
    fontSize: 12,
    color: theme.colors.text,
  },
  paymentChip: {
    height: 24,
  },
});

export default OrderCard;
