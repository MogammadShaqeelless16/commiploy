import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import supabase from '../supabaseClient'; // Ensure the correct import path
import CrecheItem from '../component/Creches/CrecheItem';
import SearchInput from '../component/Creches/SearchInput';
import Loading from '../component/loadingComponent/loading';

// Coordinates for Cape Town Central
const CAPE_TOWN_CENTRAL = { latitude: -33.9249, longitude: 18.4241 };

const placeholderImage = 'https://crechespots.org.za/wp-content/uploads/2024/08/recheSpot-1.gif'; // Placeholder image URL
const registeredIcon = require('../assets/images/Registered.png'); // Ensure correct path to your asset

const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const CrecheList = () => {
  const [creches, setCreches] = useState([]);
  const [filteredCreches, setFilteredCreches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roadName, setRoadName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let location;

        if (Platform.OS === 'web') {
          // Web platform
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                location = { latitude, longitude };
                setUserLocation(location);

                try {
                  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const data = await response.json();
                  const address = data.address;
                  if (address) {
                    setRoadName(`${address.road || ''}, ${address.city || ''}`);
                  }
                } catch (fetchError) {
                  setError(`Error fetching address: ${fetchError.message}`);
                  console.error('Error fetching address:', fetchError);
                }
              },
              (error) => {
                setUserLocation(CAPE_TOWN_CENTRAL); // Set default location
                setRoadName('Cape Town Central');
              }
            );
          } else {
            setError('Geolocation is not supported by this browser.');
            setUserLocation(CAPE_TOWN_CENTRAL); // Set default location
            setRoadName('Cape Town Central');
          }
        } else {
          // React Native platform
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            throw new Error('Location permission not granted');
          }

          try {
            location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);

            const reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
            if (reverseGeocode.length > 0) {
              const { street, subregion } = reverseGeocode[0];
              setRoadName(`${street || ''}, ${subregion || ''}`);
            }
          } catch (locationError) {
            setError(`Error fetching location: ${locationError.message}`);
            console.error('Error fetching location:', locationError.message);
            setUserLocation(CAPE_TOWN_CENTRAL); // Set default location
            setRoadName('Cape Town Central');
          }
        }
      } catch (generalError) {
        setError(`General error: ${generalError.message}`);
        console.error('General error:', generalError.message);
        setUserLocation(CAPE_TOWN_CENTRAL); // Set default location
        setRoadName('Cape Town Central');
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchCreches = async () => {
      try {
        if (!supabase) {
          throw new Error('Supabase client is not initialized.');
        }

        const { data, error } = await supabase
          .from('creches')
          .select('id, name, address, phone_number, capacity, logo, latitude, longitude, registered, monthly_price, weekly_price');

        if (error) {
          throw error;
        }

        setCreches(data);
        setFilteredCreches(data);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching creches: ${error.message}`);
        setLoading(false);
        console.error('Error fetching creches:', error.message);
      }
    };

    fetchCreches();
  }, []);

  useEffect(() => {
    if (userLocation) {
      let filtered = creches;

      filtered = filtered.map(creche => {
        const distance = getDistance(
          userLocation.latitude,
          userLocation.longitude,
          creche.latitude,
          creche.longitude
        );
        return { ...creche, distance };
      }).sort((a, b) => a.distance - b.distance);

      if (searchQuery) {
        filtered = filtered.filter(creche =>
          creche.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredCreches(filtered);
    }
  }, [searchQuery, creches, userLocation]);

  const handleSelectCreche = (crecheId) => {
    navigation.navigate('CrecheDetails', { crecheId });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchInput
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />
      {userLocation && (
        <View style={styles.listContainer}>
          <Text style={styles.nearbyText}>Centres Near You: {roadName}</Text>
          <FlatList
            data={filteredCreches}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CrecheItem
                creche={item}
                onSelectCreche={handleSelectCreche}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  nearbyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listContainer: {
    flex: 1,
  },
});

export default CrecheList;

