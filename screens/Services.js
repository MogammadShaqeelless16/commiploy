import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, Platform, TextInput } from 'react-native';
import supabase from '../supabaseClient'; // Ensure the correct import path
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import ServiceItem from './services/ServiceItem';
import Loading from '../component/loadingComponent/loading';
import Error from '../component/loadingComponent/Error';

const CAPE_TOWN_CENTRAL = { latitude: -33.9249, longitude: 18.4241 };

const Services = () => {
  const navigation = useNavigation();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLocationAndServices = async () => {
    try {
      let location;

      if (Platform.OS === 'web') {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              location = { latitude, longitude };
              setUserLocation(location);
              await fetchServices(location);
            },
            (error) => {
              setUserLocation(CAPE_TOWN_CENTRAL); // Set default location
              fetchServices(CAPE_TOWN_CENTRAL);
            }
          );
        } else {
          setError('Geolocation is not supported by this browser.');
          setUserLocation(CAPE_TOWN_CENTRAL); // Set default location
          fetchServices(CAPE_TOWN_CENTRAL);
        }
      } else {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Location permission not granted');
        }

        try {
          location = await Location.getCurrentPositionAsync({});
          setUserLocation(location.coords);
          await fetchServices(location.coords);
        } catch (locationError) {
          setUserLocation(CAPE_TOWN_CENTRAL); // Set default location
          fetchServices(CAPE_TOWN_CENTRAL);
        }
      }
    } catch (generalError) {
      setError(`General error: ${generalError.message}`);
      setUserLocation(CAPE_TOWN_CENTRAL); // Set default location
      setLoading(false);
    }
  };

  const fetchServices = async (location) => {
    try {
      const { data, error } = await supabase
        .from('services') // Change this to your services table
        .select('id, name, description, price, call_out_fee, created_at, updated_at')
        .eq('is_available', true); // Assuming there's an availability field

      if (error) {
        throw error;
      }

      setServices(data);
      setFilteredServices(data);
      setLoading(false);
    } catch (fetchError) {
      setError(`Error fetching services: ${fetchError.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocationAndServices();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchServices(userLocation);
    }
  }, [userLocation]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter services based on search query
    const queryLower = query.toLowerCase();
    const filtered = services.filter(service =>
      service.name.toLowerCase().includes(queryLower)
    );
    setFilteredServices(filtered);
  };

  const handleServicePress = (serviceId) => {
    navigation.navigate('ServiceDetails', { serviceId });
  };

  const renderItem = ({ item }) => (
    <ServiceItem
      service={item}
      onPress={() => handleServicePress(item.id)}
    />
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search services..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredServices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
});

export default Services;
