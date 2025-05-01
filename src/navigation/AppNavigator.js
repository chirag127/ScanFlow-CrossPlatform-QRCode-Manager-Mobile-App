import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { theme } from "../constants/theme";
import {
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    WhatsAppLoginScreen,
} from "../screens/auth";

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Placeholder screen component for development
 */
const PlaceholderScreen = ({ route }) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
            {route.name} Screen - Coming Soon
        </Text>
        <Text>This screen will be implemented in the next phase.</Text>
    </View>
);

/**
 * Auth Navigator - Handles authentication screens
 */
const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="WhatsAppLogin" component={WhatsAppLoginScreen} />
    </Stack.Navigator>
);

/**
 * Home Navigator - Handles home tab screens
 */
const HomeNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="HomeScreen"
            component={PlaceholderScreen}
            options={{ title: "Home" }}
        />
        <Stack.Screen
            name="RestaurantDetail"
            component={PlaceholderScreen}
            options={{ title: "Restaurant" }}
        />
        <Stack.Screen
            name="MenuScreen"
            component={PlaceholderScreen}
            options={{ title: "Menu" }}
        />
        <Stack.Screen
            name="DishDetail"
            component={PlaceholderScreen}
            options={{ title: "Dish" }}
        />
    </Stack.Navigator>
);

/**
 * Search Navigator - Handles search tab screens
 */
const SearchNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="SearchScreen"
            component={PlaceholderScreen}
            options={{ title: "Search" }}
        />
        <Stack.Screen
            name="SearchResults"
            component={PlaceholderScreen}
            options={{ title: "Results" }}
        />
    </Stack.Navigator>
);

/**
 * Cart Navigator - Handles cart tab screens
 */
const CartNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="CartScreen"
            component={PlaceholderScreen}
            options={{ title: "Cart" }}
        />
        <Stack.Screen
            name="Checkout"
            component={PlaceholderScreen}
            options={{ title: "Checkout" }}
        />
        <Stack.Screen
            name="Payment"
            component={PlaceholderScreen}
            options={{ title: "Payment" }}
        />
    </Stack.Navigator>
);

/**
 * Orders Navigator - Handles orders tab screens
 */
const OrdersNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="OrdersScreen"
            component={PlaceholderScreen}
            options={{ title: "My Orders" }}
        />
        <Stack.Screen
            name="OrderDetail"
            component={PlaceholderScreen}
            options={{ title: "Order Details" }}
        />
        <Stack.Screen
            name="OrderTracking"
            component={PlaceholderScreen}
            options={{ title: "Track Order" }}
        />
    </Stack.Navigator>
);

/**
 * Profile Navigator - Handles profile tab screens
 */
const ProfileNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="ProfileScreen"
            component={PlaceholderScreen}
            options={{ title: "Profile" }}
        />
        <Stack.Screen
            name="EditProfile"
            component={PlaceholderScreen}
            options={{ title: "Edit Profile" }}
        />
        <Stack.Screen
            name="Addresses"
            component={PlaceholderScreen}
            options={{ title: "My Addresses" }}
        />
        <Stack.Screen
            name="Settings"
            component={PlaceholderScreen}
            options={{ title: "Settings" }}
        />
    </Stack.Navigator>
);

/**
 * Main Tab Navigator - Handles main app tabs
 */
const MainNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                    iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Search") {
                    iconName = focused ? "search" : "search-outline";
                } else if (route.name === "Cart") {
                    iconName = focused ? "cart" : "cart-outline";
                } else if (route.name === "Orders") {
                    iconName = focused ? "list" : "list-outline";
                } else if (route.name === "Profile") {
                    iconName = focused ? "person" : "person-outline";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: "gray",
            headerShown: false,
        })}
    >
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Search" component={SearchNavigator} />
        <Tab.Screen name="Cart" component={CartNavigator} />
        <Tab.Screen name="Orders" component={OrdersNavigator} />
        <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
);

/**
 * Loading screen component
 */
const LoadingScreen = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 20, fontSize: 16 }}>Loading...</Text>
    </View>
);

/**
 * Root Navigator - Handles authentication state
 */
const RootNavigator = () => {
    const { isAuthenticated, initializing } = useAuth();

    if (initializing) {
        return <LoadingScreen />;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name="Main" component={MainNavigator} />
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
