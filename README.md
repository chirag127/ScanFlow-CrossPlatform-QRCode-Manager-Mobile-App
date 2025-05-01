# QRSay User Frontend - React Native Expo App

This is the React Native Expo app for the QRSay user frontend. It replicates all the functionality of the web frontend, allowing users to browse restaurants, view menus, place orders, and track their orders.

## Features

-   Authentication (login, registration, profile management)
-   Restaurant browsing (search, filters, details)
-   Menu browsing (categories, dishes, filtering)
-   Cart management (add/remove items, promo codes)
-   Order placement (delivery, takeaway, dine-in)
-   Order tracking (status updates, history)
-   Additional features (waiter calls, feedback, reviews)

## Getting Started

### Prerequisites

-   Node.js (v14 or later)
-   npm or yarn
-   Expo CLI

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/qrsay.git
cd qrsay/qrsay-user-frontend-react-native-expo-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

4. Run on a device or emulator:

    - Scan the QR code with the Expo Go app on your mobile device
    - Press 'a' to run on an Android emulator
    - Press 'i' to run on an iOS simulator (requires macOS)

5. If you encounter any issues, try clearing the cache:

```bash
npm run clear-cache
# or
npm run start-clean
```

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
API_URL=https://qrsaybackend-36c9.onrender.com/api
SOCKET_URL=https://qrsaybackend-36c9.onrender.com
RAZORPAY_KEY_ID=rzp_test_riSm0PLxWxsyrG
```

## Project Structure

```
qrsay-user-frontend-react-native-expo-app/
├── src/
│   ├── assets/           # Images, fonts, and other static files
│   ├── components/       # Reusable UI components
│   ├── constants/        # App constants and theme
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # App screens
│   ├── services/         # API services
│   └── utils/            # Utility functions
├── App.js                # Main app component
├── app.json              # Expo configuration
└── package.json          # Dependencies and scripts
```

## Backend Integration

This app uses the existing QRSay backend API. The API endpoints are defined in `src/constants/index.js`.

## Troubleshooting

### Error: Unsupported top level event type "topInsetsChange" dispatched

If you encounter this error, try the following solutions:

1. Clear the cache and restart the app:

    ```bash
    npm run start-clean
    ```

2. Make sure you have the latest versions of all dependencies:

    ```bash
    npm install
    ```

3. If the error persists, try the following:
    - Delete the node_modules folder and reinstall dependencies
    - Restart your development environment
    - Ensure you're using the correct version of Expo and React Native
    - Check for any conflicting dependencies

The error is related to React Native's handling of safe area insets and is typically resolved by clearing the cache or updating dependencies.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
