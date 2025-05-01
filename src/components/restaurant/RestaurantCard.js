import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, Card, Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import RestaurantPlaceholder from "../../assets/restaurant-placeholder";

/**
 * RestaurantCard component for displaying restaurant information
 * @param {Object} props - Component props
 * @param {Object} props.restaurant - Restaurant data
 * @param {Function} props.onPress - Function to call when card is pressed
 * @param {Object} props.style - Additional styles for the card
 * @returns {JSX.Element} RestaurantCard component
 */
const RestaurantCard = ({ restaurant, onPress, style }) => {
    if (!restaurant) return null;

    // Extract restaurant data
    const {
        restaurantName,
        restaurantBackgroundImage,
        restaurantStatus,
        cuisine = [],
        address = {},
        provideDelivery,
        provideTakeAway,
        provideDineIn,
    } = restaurant;

    // Format address
    const formattedAddress = address.street
        ? `${address.street}, ${address.city || ""}`
        : "Address not available";

    // Check if restaurant is open
    const isOpen = restaurantStatus === "online";

    return (
        <Card style={[styles.card, style]} onPress={onPress}>
            <View style={styles.imageContainer}>
                {restaurantBackgroundImage ? (
                    <Image
                        source={{ uri: restaurantBackgroundImage }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.image}>
                        <RestaurantPlaceholder />
                    </View>
                )}
                <View style={styles.statusContainer}>
                    <View
                        style={[
                            styles.statusIndicator,
                            { backgroundColor: isOpen ? "#4CAF50" : "#F44336" },
                        ]}
                    />
                    <Text style={styles.statusText}>
                        {isOpen ? "Open" : "Closed"}
                    </Text>
                </View>
            </View>

            <Card.Content style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                    {restaurantName}
                </Text>

                <View style={styles.cuisineContainer}>
                    {cuisine.slice(0, 3).map((item, index) => (
                        <Chip
                            key={index}
                            style={styles.cuisineChip}
                            textStyle={styles.cuisineText}
                            mode="outlined"
                        >
                            {item.name}
                        </Chip>
                    ))}
                    {cuisine.length > 3 && (
                        <Text style={styles.moreCuisines}>
                            +{cuisine.length - 3}
                        </Text>
                    )}
                </View>

                <View style={styles.addressContainer}>
                    <Ionicons
                        name="location-outline"
                        size={16}
                        color={theme.colors.text}
                    />
                    <Text style={styles.address} numberOfLines={1}>
                        {formattedAddress}
                    </Text>
                </View>

                <View style={styles.servicesContainer}>
                    {provideDelivery && (
                        <View style={styles.serviceItem}>
                            <Ionicons
                                name="bicycle-outline"
                                size={16}
                                color={theme.colors.text}
                            />
                            <Text style={styles.serviceText}>Delivery</Text>
                        </View>
                    )}
                    {provideTakeAway && (
                        <View style={styles.serviceItem}>
                            <Ionicons
                                name="bag-outline"
                                size={16}
                                color={theme.colors.text}
                            />
                            <Text style={styles.serviceText}>Takeaway</Text>
                        </View>
                    )}
                    {provideDineIn && (
                        <View style={styles.serviceItem}>
                            <Ionicons
                                name="restaurant-outline"
                                size={16}
                                color={theme.colors.text}
                            />
                            <Text style={styles.serviceText}>Dine-in</Text>
                        </View>
                    )}
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: "hidden",
        elevation: 2,
    },
    imageContainer: {
        position: "relative",
        height: 150,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    statusContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 16,
    },
    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 4,
    },
    statusText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    content: {
        padding: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    cuisineContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 8,
    },
    cuisineChip: {
        marginRight: 4,
        marginBottom: 4,
        height: 24,
        backgroundColor: theme.colors.surface,
    },
    cuisineText: {
        fontSize: 10,
    },
    moreCuisines: {
        fontSize: 10,
        color: theme.colors.primary,
        alignSelf: "center",
        marginLeft: 4,
    },
    addressContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    address: {
        fontSize: 12,
        color: theme.colors.text,
        marginLeft: 4,
        flex: 1,
    },
    servicesContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    serviceItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 12,
    },
    serviceText: {
        fontSize: 12,
        color: theme.colors.text,
        marginLeft: 4,
    },
});

export default RestaurantCard;
