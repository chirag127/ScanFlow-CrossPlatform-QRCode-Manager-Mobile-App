import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { LoadingIndicator } from '../../components';

/**
 * QRScannerScreen component for scanning restaurant QR codes
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @param {Object} props.route - Route object
 * @returns {JSX.Element} QRScannerScreen component
 */
const QRScannerScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  // Request camera permission on mount
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handle QR code scan
  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) return;
    
    setScanned(true);
    setLoading(true);
    
    try {
      // Check if the QR code is a valid restaurant URL
      if (data.includes('restaurant/')) {
        // Extract restaurant URL from QR code
        const restaurantUrl = data.split('restaurant/')[1].split('/')[0];
        
        // Navigate to restaurant detail screen
        navigation.replace('RestaurantDetail', { restaurantUrl });
      } else {
        // Invalid QR code
        alert('Invalid QR code. Please scan a valid restaurant QR code.');
        setScanned(false);
      }
    } catch (error) {
      console.error('Error processing QR code:', error);
      alert('Error processing QR code. Please try again.');
      setScanned(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };

  // Handle permission denied
  if (hasPermission === null) {
    return <LoadingIndicator fullScreen message="Requesting camera permission..." />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-off" size={64} color={theme.colors.error} />
        <Text style={styles.permissionText}>
          Camera permission is required to scan QR codes.
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingIndicator fullScreen message="Processing QR code..." />
      ) : (
        <>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          
          <View style={styles.overlay}>
            <View style={styles.scanArea} />
          </View>
          
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Scan Restaurant QR Code</Text>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Align the QR code within the frame to scan
            </Text>
            {scanned && (
              <TouchableOpacity
                style={styles.scanAgainButton}
                onPress={() => setScanned(false)}
              >
                <Text style={styles.scanAgainButtonText}>Scan Again</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: theme.colors.text,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: 'transparent',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 16,
  },
  scanAgainButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
  },
  scanAgainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QRScannerScreen;
