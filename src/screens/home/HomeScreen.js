import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    ScrollView,
} from "react-native";
import { Text, Searchbar, Chip, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { theme } from "../../constants/theme";
import {
    RestaurantCard,
    LoadingIndicator,
    ErrorDisplay,
    EmptyState,
} from "../../components";
import * as restaurantService from "../../services/restaurantService";
import { useApi } from "../../hooks";

/**
 * HomeScreen component for displaying restaurants
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @returns {JSX.Element} HomeScreen component
 */
const HomeScreen = ({ navigation }) => {
    const { user, isAuthenticated, isGuest } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [refreshing, setRefreshing] = useState(false);

    // API hooks
    const {
        data: restaurants,
        loading,
        error,
        request: fetchRestaurants,
    } = useApi(restaurantService.getAllRestaurants);

    // Fetch restaurants on mount
    useEffect(() => {
        loadRestaurants();
    }, []);

    // Mock data for testing
    const mockRestaurants = [
        {
            _id: "1",
            restaurantName: "Spice Garden",
            restaurantBackgroundImage:
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
            restaurantStatus: "online",
            cuisine: [{ name: "Indian" }, { name: "Vegetarian" }],
            address: {
                street: "123 Main St",
                city: "Mumbai",
            },
            provideDelivery: true,
            provideTakeAway: true,
            provideDineIn: true,
        },
        {
            _id: "2",
            restaurantName: "Burger Palace",
            restaurantBackgroundImage:
                "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVyZ2VyfGVufDB8fDB8fHww&w=1000&q=80",
            restaurantStatus: "online",
            cuisine: [{ name: "American" }, { name: "Fast Food" }],
            address: {
                street: "456 Oak St",
                city: "Delhi",
            },
            provideDelivery: true,
            provideTakeAway: true,
            provideDineIn: false,
        },
        {
            _id: "3",
            restaurantName: "Pasta Paradise",
            restaurantBackgroundImage:
                "https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
            restaurantStatus: "offline",
            cuisine: [{ name: "Italian" }, { name: "European" }],
            address: {
                street: "789 Pine St",
                city: "Bangalore",
            },
            provideDelivery: false,
            provideTakeAway: true,
            provideDineIn: true,
        },
    ];

    // Load restaurants
    const loadRestaurants = async () => {
        try {
            // Try to fetch from API
            await fetchRestaurants();

            // If API fails or returns empty, use mock data
            if (!restaurants || (restaurants && restaurants.length === 0)) {
                console.log("Using mock restaurant data");
                setRestaurantList(mockRestaurants);
            }
        } catch (error) {
            console.error("Error loading restaurants:", error);
            // Use mock data if API fails
            console.log("Using mock restaurant data after error");
            setRestaurantList(mockRestaurants);
        }
    };

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await loadRestaurants();
        setRefreshing(false);
    };

    // Handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Handle filter selection
    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
    };

    // Handle restaurant selection
    const handleRestaurantSelect = (restaurant) => {
        navigation.navigate("RestaurantDetail", { restaurant });
    };

    // Initialize restaurantList
    const [restaurantList, setRestaurantList] = useState([]);

    // Update restaurantList when restaurants data changes
    useEffect(() => {
        if (
            restaurants &&
            restaurants.data &&
            Array.isArray(restaurants.data)
        ) {
            setRestaurantList(restaurants.data);
        } else if (restaurants && Array.isArray(restaurants)) {
            setRestaurantList(restaurants);
        } else {
            setRestaurantList([]);
        }
    }, [restaurants]);

    // Filter restaurants based on search query and selected filter
    const filteredRestaurants = restaurantList.filter((restaurant) => {
        // Search filter
        const matchesSearch =
            restaurant.restaurantName
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            (restaurant.cuisine &&
                restaurant.cuisine.some((c) =>
                    c.name?.toLowerCase().includes(searchQuery.toLowerCase())
                ));

        // Category filter
        const matchesFilter =
            selectedFilter === "all" ||
            (selectedFilter === "open" &&
                restaurant.restaurantStatus === "online") ||
            (selectedFilter === "delivery" && restaurant.provideDelivery) ||
            (selectedFilter === "takeaway" && restaurant.provideTakeAway) ||
            (selectedFilter === "dine-in" && restaurant.provideDineIn);

        return matchesSearch && matchesFilter;
    });

    // Render restaurant item
    const renderRestaurantItem = ({ item }) => (
        <RestaurantCard
            restaurant={item}
            onPress={() => handleRestaurantSelect(item)}
        />
    );

    // Render header
    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.greeting}>
                {isAuthenticated
                    ? `Hello, ${user?.name?.split(" ")[0] || "User"}`
                    : "Hello, Guest"}
            </Text>
            <Text style={styles.subtitle}>
                What would you like to eat today?
            </Text>

            <Searchbar
                placeholder="Search restaurants or cuisines"
                onChangeText={handleSearch}
                value={searchQuery}
                style={styles.searchBar}
                icon={() => (
                    <Ionicons
                        name="search"
                        size={20}
                        color={theme.colors.primary}
                    />
                )}
                clearIcon={() => (
                    <Ionicons
                        name="close"
                        size={20}
                        color={theme.colors.primary}
                    />
                )}
            />

            <View style={styles.filtersContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Chip
                        selected={selectedFilter === "all"}
                        onPress={() => handleFilterSelect("all")}
                        style={[
                            styles.filterChip,
                            selectedFilter === "all" &&
                                styles.selectedFilterChip,
                        ]}
                        textStyle={
                            selectedFilter === "all"
                                ? styles.selectedFilterText
                                : styles.filterText
                        }
                    >
                        All
                    </Chip>
                    <Chip
                        selected={selectedFilter === "open"}
                        onPress={() => handleFilterSelect("open")}
                        style={[
                            styles.filterChip,
                            selectedFilter === "open" &&
                                styles.selectedFilterChip,
                        ]}
                        textStyle={
                            selectedFilter === "open"
                                ? styles.selectedFilterText
                                : styles.filterText
                        }
                    >
                        Open Now
                    </Chip>
                    <Chip
                        selected={selectedFilter === "delivery"}
                        onPress={() => handleFilterSelect("delivery")}
                        style={[
                            styles.filterChip,
                            selectedFilter === "delivery" &&
                                styles.selectedFilterChip,
                        ]}
                        textStyle={
                            selectedFilter === "delivery"
                                ? styles.selectedFilterText
                                : styles.filterText
                        }
                    >
                        Delivery
                    </Chip>
                    <Chip
                        selected={selectedFilter === "takeaway"}
                        onPress={() => handleFilterSelect("takeaway")}
                        style={[
                            styles.filterChip,
                            selectedFilter === "takeaway" &&
                                styles.selectedFilterChip,
                        ]}
                        textStyle={
                            selectedFilter === "takeaway"
                                ? styles.selectedFilterText
                                : styles.filterText
                        }
                    >
                        Takeaway
                    </Chip>
                    <Chip
                        selected={selectedFilter === "dine-in"}
                        onPress={() => handleFilterSelect("dine-in")}
                        style={[
                            styles.filterChip,
                            selectedFilter === "dine-in" &&
                                styles.selectedFilterChip,
                        ]}
                        textStyle={
                            selectedFilter === "dine-in"
                                ? styles.selectedFilterText
                                : styles.filterText
                        }
                    >
                        Dine-In
                    </Chip>
                </ScrollView>
            </View>
        </View>
    );

    if (loading && !refreshing) {
        return <LoadingIndicator fullScreen message="Loading restaurants..." />;
    }

    if (error && restaurantList.length === 0) {
        return (
            <ErrorDisplay
                message="Failed to load restaurants. Please try again."
                onRetry={loadRestaurants}
                fullScreen
            />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredRestaurants}
                renderItem={renderRestaurantItem}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    <EmptyState
                        title="No Restaurants Found"
                        message="Try changing your search or filter criteria."
                        buttonText="Refresh"
                        onButtonPress={handleRefresh}
                    />
                }
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[theme.colors.primary]}
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    listContent: {
        paddingBottom: 20,
    },
    header: {
        padding: 16,
    },
    greeting: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 16,
    },
    searchBar: {
        marginBottom: 16,
        backgroundColor: theme.colors.surface,
        elevation: 2,
    },
    filtersContainer: {
        marginBottom: 16,
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
        color: "white",
    },
});

export default HomeScreen;
