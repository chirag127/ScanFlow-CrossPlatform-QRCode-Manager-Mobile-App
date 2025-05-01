import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { TextInput, Button, Text, Divider, Snackbar } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../utils/validation";
import { theme } from "../../constants/theme";
import { LoadingIndicator } from "../../components";

/**
 * LoginScreen component for user authentication
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @returns {JSX.Element} LoginScreen component
 */
const LoginScreen = ({ navigation }) => {
    const { login, whatsappLogin, continueAsGuest } = useAuth();
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    // Form validation using react-hook-form and yup
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Handle login form submission
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError("");
            await login(data);
            // Navigation will be handled by the auth context
        } catch (error) {
            setError(error.message);
            setSnackbarVisible(true);
        } finally {
            setLoading(false);
        }
    };

    // Navigate to WhatsApp login screen
    const handleWhatsAppLogin = () => {
        navigation.navigate("WhatsAppLogin");
    };

    // Navigate to register screen
    const handleRegister = () => {
        navigation.navigate("Register");
    };

    // Navigate to forgot password screen
    const handleForgotPassword = () => {
        navigation.navigate("ForgotPassword");
    };

    // Handle continue as guest
    const handleContinueAsGuest = async () => {
        try {
            setLoading(true);
            await continueAsGuest();
            // Navigation will be handled by the auth context
        } catch (error) {
            setError(error.message);
            setSnackbarVisible(true);
        } finally {
            setLoading(false);
        }
    };

    // Toggle password visibility
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    if (loading) {
        return <LoadingIndicator fullScreen message="Logging in..." />;
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../../assets/logo.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.appName}>QRSay</Text>
                    <Text style={styles.tagline}>Order food with ease</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.title}>Login</Text>

                    {/* Email Input */}
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="Email"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                style={styles.input}
                                mode="outlined"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                left={<TextInput.Icon icon="email-outline" />}
                                error={!!errors.email}
                            />
                        )}
                    />
                    {errors.email && (
                        <Text style={styles.errorText}>
                            {errors.email.message}
                        </Text>
                    )}

                    {/* Password Input */}
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="Password"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                style={styles.input}
                                mode="outlined"
                                secureTextEntry={secureTextEntry}
                                left={<TextInput.Icon icon="lock-outline" />}
                                right={
                                    <TextInput.Icon
                                        icon={
                                            secureTextEntry
                                                ? "eye-outline"
                                                : "eye-off-outline"
                                        }
                                        onPress={toggleSecureEntry}
                                    />
                                }
                                error={!!errors.password}
                            />
                        )}
                    />
                    {errors.password && (
                        <Text style={styles.errorText}>
                            {errors.password.message}
                        </Text>
                    )}

                    {/* Forgot Password Link */}
                    <TouchableOpacity
                        onPress={handleForgotPassword}
                        style={styles.forgotPasswordContainer}
                    >
                        <Text style={styles.forgotPasswordText}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <Button
                        mode="contained"
                        onPress={handleSubmit(onSubmit)}
                        style={styles.button}
                        labelStyle={styles.buttonLabel}
                    >
                        Login
                    </Button>

                    <Divider style={styles.divider} />

                    {/* WhatsApp Login Button */}
                    <Button
                        mode="outlined"
                        onPress={handleWhatsAppLogin}
                        style={styles.whatsappButton}
                        labelStyle={styles.whatsappButtonLabel}
                        icon={() => (
                            <Ionicons
                                name="logo-whatsapp"
                                size={20}
                                color="#25D366"
                            />
                        )}
                    >
                        Login with WhatsApp
                    </Button>

                    {/* Register Link */}
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>
                            Don't have an account?{" "}
                        </Text>
                        <TouchableOpacity onPress={handleRegister}>
                            <Text style={styles.registerLink}>Register</Text>
                        </TouchableOpacity>
                    </View>

                    <Divider style={styles.divider} />

                    {/* Continue as Guest Button */}
                    <Button
                        mode="text"
                        onPress={handleContinueAsGuest}
                        style={styles.guestButton}
                        labelStyle={styles.guestButtonLabel}
                        icon={() => (
                            <Ionicons
                                name="person-outline"
                                size={20}
                                color={theme.colors.text}
                            />
                        )}
                    >
                        Continue as Guest
                    </Button>
                </View>
            </ScrollView>

            {/* Error Snackbar */}
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                style={styles.snackbar}
            >
                {error}
            </Snackbar>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    appName: {
        fontSize: 24,
        fontWeight: "bold",
        color: theme.colors.primary,
        marginTop: 10,
    },
    tagline: {
        fontSize: 16,
        color: theme.colors.text,
        marginTop: 5,
    },
    formContainer: {
        width: "100%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: theme.colors.text,
    },
    input: {
        marginBottom: 10,
        backgroundColor: theme.colors.surface,
    },
    errorText: {
        color: theme.colors.error,
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 5,
    },
    forgotPasswordContainer: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: theme.colors.primary,
    },
    button: {
        marginBottom: 20,
        paddingVertical: 8,
        backgroundColor: theme.colors.primary,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    divider: {
        marginVertical: 20,
    },
    whatsappButton: {
        marginBottom: 20,
        paddingVertical: 8,
        borderColor: "#25D366",
    },
    whatsappButtonLabel: {
        fontSize: 16,
        color: "#25D366",
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    registerText: {
        color: theme.colors.text,
    },
    registerLink: {
        color: theme.colors.primary,
        fontWeight: "bold",
    },
    snackbar: {
        backgroundColor: theme.colors.error,
    },
    guestButton: {
        marginTop: 10,
        marginBottom: 20,
    },
    guestButtonLabel: {
        fontSize: 16,
        color: theme.colors.text,
    },
});

export default LoginScreen;
