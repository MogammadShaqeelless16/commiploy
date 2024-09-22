import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Location from 'expo-location';

const CrecheList = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // For web browsers
      if (Platform.OS === 'web') {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
            setErrorMsg(null);
          },
          (error) => {
            setErrorMsg('Error fetching location: ' + error.message);
          },
          { enableHighAccuracy: true }
        );
      } else {
        // For mobile devices
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setUserLocation(location.coords);
        setErrorMsg(null);
      }
    } catch (error) {
      setErrorMsg('Error fetching location: ' + error.message);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : userLocation ? (
        <View>
          <Text style={styles.text}>Your Location:</Text>
          <Text style={styles.text}>Latitude: {userLocation.latitude}</Text>
          <Text style={styles.text}>Longitude: {userLocation.longitude}</Text>
        </View>
      ) : (
        <Text style={styles.text}>Fetching your location...</Text>
      )}
      <Button title="Refresh Location" onPress={fetchLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default CrecheList;
