import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LocationDisplay = () => {
  const [streetName, setStreetName] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        await fetchStreetName(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        setErrorMsg('Error fetching location: ' + error.message);
      }
    };

    const fetchStreetName = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        if (response.data) {
          const street = response.data.address.road || '';
          const area = response.data.address.suburb || response.data.address.neighbourhood || '';
          setStreetName(`${street}, ${area}`.trim());
        } else {
          setStreetName('Unknown location');
        }
      } catch (error) {
        console.error('Error fetching street name:', error);
        setErrorMsg('Error fetching street name');
      }
    };

    fetchLocation();
  }, []);

  // Conditional rendering based on error message
  if (errorMsg) {
    return null; // Do not render anything if there's an error
  }

  return (
    <View style={styles.locationSection}>
      <Text style={styles.locationTitle}>
        <Icon name="my-location" size={20} color="#007bff" />  
        <Text style={styles.locationText}>Your community : {streetName || 'Fetching location...'}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  locationSection: {
    backgroundColor: '#e1f5fe',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default LocationDisplay;
