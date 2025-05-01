import React from "react";
import { View, Text, ActivityIndicator, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useAuth } from "../context/AuthContext";
import { theme } from "../constants/theme";
import {
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    WhatsAppLoginScreen,
} from "../screens/auth";
import { ProfileScreen } from "../screens/profile";
import {
    HomeScreen,
    QRScannerScreen,
    RestaurantDetailScreen,
    MenuScreen,
} from "../screens/home";
import * as navigationTypes from "./navigationTypes";

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
        <Stack.Screen
            name={navigationTypes.AUTH_STACK.LOGIN}
            component={LoginScreen}
        />
        <Stack.Screen
            name={navigationTypes.AUTH_STACK.REGISTER}
            component={RegisterScreen}
        />
        <Stack.Screen
            name={navigationTypes.AUTH_STACK.FORGOT_PASSWORD}
            component={ForgotPasswordScreen}
        />
        <Stack.Screen
            name={navigationTypes.AUTH_STACK.WHATSAPP_LOGIN}
            component={WhatsAppLoginScreen}
        />
    </Stack.Navigator>
);

/**
 * Home Navigator - Handles home tab screens
 */
const HomeNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={navigationTypes.HOME_STACK.HOME_SCREEN}
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: "Home",
                    headerRight: () => (
                        <Ionicons
                            name="scan-outline"
                            size={24}
                            color={theme.colors.primary}
                            style={{ marginRight: 16 }}
                            onPress={() =>
                                navigation.navigate(
                                    navigationTypes.HOME_STACK.QR_SCANNER
                                )
                            }
                        />
                    ),
                })}
            />
            <Stack.Screen
                name={navigationTypes.HOME_STACK.RESTAURANT_DETAIL}
                component={RestaurantDetailScreen}
                options={({ route }) => ({
                    title:
                        route.params?.restaurant?.restaurantName ||
                        "Restaurant",
                    headerBackTitle: "Back",
                })}
            />
            <Stack.Screen
                name={navigationTypes.HOME_STACK.MENU_SCREEN}
                component={MenuScreen}
                options={{
                    title: "Menu",
                    headerBackTitle: "Restaurant",
                }}
            />
            <Stack.Screen
                name={navigationTypes.HOME_STACK.DISH_DETAIL}
                component={PlaceholderScreen}
                options={({ route }) => ({
                    title: route.params?.dish?.dishName || "Dish",
                    headerBackTitle: "Menu",
                })}
            />
            <Stack.Screen
                name={navigationTypes.HOME_STACK.QR_SCANNER}
                component={QRScannerScreen}
                options={{
                    title: "Scan QR Code",
                    headerShown: false,
                    presentation: "fullScreenModal",
                }}
            />
        </Stack.Navigator>
    );
};

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
            component={ProfileScreen}
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

                if (route.name === navigationTypes.MAIN_TABS.HOME) {
                    iconName = focused ? "home" : "home-outline";
                } else if (route.name === navigationTypes.MAIN_TABS.SEARCH) {
                    iconName = focused ? "search" : "search-outline";
                } else if (route.name === navigationTypes.MAIN_TABS.CART) {
                    iconName = focused ? "cart" : "cart-outline";
                } else if (route.name === navigationTypes.MAIN_TABS.ORDERS) {
                    iconName = focused ? "list" : "list-outline";
                } else if (route.name === navigationTypes.MAIN_TABS.PROFILE) {
                    iconName = focused ? "person" : "person-outline";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: "gray",
            headerShown: false,
        })}
    >
        <Tab.Screen
            name={navigationTypes.MAIN_TABS.HOME}
            component={HomeNavigator}
            options={{
                title: "Home",
            }}
        />
        <Tab.Screen
            name={navigationTypes.MAIN_TABS.SEARCH}
            component={SearchNavigator}
            options={{
                title: "Search",
            }}
        />
        <Tab.Screen
            name={navigationTypes.MAIN_TABS.CART}
            component={CartNavigator}
            options={{
                title: "Cart",
            }}
        />
        <Tab.Screen
            name={navigationTypes.MAIN_TABS.ORDERS}
            component={OrdersNavigator}
            options={{
                title: "Orders",
            }}
        />
        <Tab.Screen
            name={navigationTypes.MAIN_TABS.PROFILE}
            component={ProfileNavigator}
            options={{
                title: "Profile",
            }}
        />
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
 * Configure deep linking
 */
const linking = {
    prefixes: [
        // Add your app's deep link prefixes here
        "qrsay://",
        "https://qrsay.com",
        "https://*.qrsay.com",
        Linking.createURL("/"),
    ],
    config: {
        // Configuration for matching screens with paths
        screens: {
            [navigationTypes.ROOT_STACK.MAIN]: {
                screens: {
                    [navigationTypes.MAIN_TABS.HOME]: {
                        screens: {
                            [navigationTypes.HOME_STACK.RESTAURANT_DETAIL]:
                                "restaurant/:restaurantUrl",
                            [navigationTypes.HOME_STACK.QR_SCANNER]: "scan",
                        },
                    },
                    [navigationTypes.MAIN_TABS.SEARCH]: "search",
                    [navigationTypes.MAIN_TABS.CART]: "cart",
                    [navigationTypes.MAIN_TABS.ORDERS]: {
                        screens: {
                            [navigationTypes.ORDERS_STACK.ORDER_TRACKING]:
                                "order/:orderId",
                        },
                    },
                    [navigationTypes.MAIN_TABS.PROFILE]: "profile",
                },
            },
            [navigationTypes.ROOT_STACK.AUTH]: {
                screens: {
                    [navigationTypes.AUTH_STACK.LOGIN]: "login",
                    [navigationTypes.AUTH_STACK.REGISTER]: "register",
                },
            },
        },
    },
    // Custom function to get the initial URL
    async getInitialURL() {
        // First, check if the app was opened via a deep link
        const url = await Linking.getInitialURL();

        if (url != null) {
            return url;
        }

        // If no deep link was used, check if there's an initial notification
        // This is for handling push notifications that open the app
        // You can add this if you implement push notifications

        return null;
    },
    // Subscribe to URL updates
    subscribe(listener) {
        // Listen to incoming links from deep linking
        const linkingSubscription = Linking.addEventListener(
            "url",
            ({ url }) => {
                listener(url);
            }
        );

        return () => {
            // Clean up the event listeners
            linkingSubscription.remove();
        };
    },
};

/**
 * Root Navigator - Handles authentication state
 */
const RootNavigator = () => {
    const { isAuthenticated, isGuest, initializing } = useAuth();

    if (initializing) {
        return <LoadingScreen />;
    }

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            linking={linking}
            fallback={<LoadingScreen />}
        >
            {isAuthenticated || isGuest ? (
                <Stack.Screen
                    name={navigationTypes.ROOT_STACK.MAIN}
                    component={MainNavigator}
                />
            ) : (
                <Stack.Screen
                    name={navigationTypes.ROOT_STACK.AUTH}
                    component={AuthNavigator}
                />
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
