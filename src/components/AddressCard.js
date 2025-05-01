import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

/**
 * AddressCard component for displaying address information
 * @param {Object} props - Component props
 * @param {Object} props.address - Address data
 * @param {Function} props.onPress - Function to call when card is pressed
 * @param {Function} props.onEdit - Function to call when edit button is pressed
 * @param {Function} props.onDelete - Function to call when delete button is pressed
 * @param {boolean} props.selected - Whether the address is selected
 * @returns {JSX.Element} AddressCard component
 */
const AddressCard = ({ address, onPress, onEdit, onDelete, selected }) => {
  if (!address) return null;

  const {
    addressType,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    landmark,
  } = address;

  // Get address type icon
  const getAddressTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'home':
        return 'home-outline';
      case 'work':
        return 'briefcase-outline';
      default:
        return 'location-outline';
    }
  };

  // Format full address
  const fullAddress = [
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    landmark ? `Landmark: ${landmark}` : null,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card
        style={[
          styles.card,
          selected && styles.selectedCard,
        ]}
      >
        <Card.Content>
          <View style={styles.header}>
            <View style={styles.typeContainer}>
              <Ionicons
                name={getAddressTypeIcon(addressType)}
                size={20}
                color={theme.colors.primary}
                style={styles.icon}
              />
              <Title style={styles.title}>
                {addressType?.charAt(0).toUpperCase() + addressType?.slice(1) || 'Address'}
              </Title>
            </View>
            <View style={styles.actionsContainer}>
              <IconButton
                icon="pencil-outline"
                size={20}
                color={theme.colors.primary}
                onPress={(e) => {
                  e.stopPropagation();
                  onEdit && onEdit(address);
                }}
                style={styles.actionButton}
              />
              <IconButton
                icon="trash-outline"
                size={20}
                color={theme.colors.error}
                onPress={(e) => {
                  e.stopPropagation();
                  onDelete && onDelete(address);
                }}
                style={styles.actionButton}
              />
            </View>
          </View>
          <Paragraph style={styles.address}>{fullAddress}</Paragraph>
          {selected && (
            <View style={styles.selectedBadge}>
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
          )}
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
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    margin: 0,
  },
  address: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddressCard;
