import React, { useEffect, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { theme } from "./src/constants/theme";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import { RestaurantProvider } from "./src/context/RestaurantContext";
import { OrderProvider } from "./src/context/OrderContext";
import { LocationProvider } from "./src/context/LocationContext";

// Ignore specific warnings
LogBox.ignoreLogs([
    'Unsupported top level event type "topInsetsChange" dispatched',
    "Non-serializable values were found in the navigation state",
]);

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Load fonts
    useEffect(() => {
        async function loadFonts() {
            try {
                await Font.loadAsync({
                    ...Ionicons.font,
                });
                setFontsLoaded(true);
            } catch (e) {
                console.warn("Error loading fonts:", e);
            }
        }

        loadFonts();
    }, []);

    // Prepare app resources
    useEffect(() => {
        async function prepare() {
            try {
                // Wait for fonts to load
                if (!fontsLoaded) return;

                // Simulate a delay for splash screen
                await new Promise((resolve) => setTimeout(resolve, 1000));
            } catch (e) {
                console.warn("Error preparing app:", e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, [fontsLoaded]);

    // Hide splash screen when app is ready
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <SafeAreaProvider>
                <PaperProvider theme={theme}>
                    <NavigationContainer fallback={<Text>Loading...</Text>}>
                        <AuthProvider>
                            <RestaurantProvider>
                                <CartProvider>
                                    <OrderProvider>
                                        <LocationProvider>
                                            <StatusBar style="auto" />
                                            <AppNavigator />
                                        </LocationProvider>
                                    </OrderProvider>
                                </CartProvider>
                            </RestaurantProvider>
                        </AuthProvider>
                    </NavigationContainer>
                </PaperProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
