import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, Platform, TextInput, Button } from 'react-native';
import supabase from '../supabaseClient'; // Ensure the correct import path
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import DriverItem from '../component/Transport/DriverItem';
import Loading from '../component/loadingComponent/loading';
import Error from '../component/loadingComponent/Error';

const CAPE_TOWN_CENTRAL = { latitude: -33.9249, longitude: 18.4241 };

const Transport = () => {
  const navigation = useNavigation();
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLocationAndDrivers = async () => {
    try {
      let location;

      if (Platform.OS === 'web') {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              location = { latitude, longitude };
              setUserLocation(location);
              await fetchDrivers(location);
            },
            (error) => {
              setUserLocation(CAPE_TOWN_CENTRAL); // Set default location
              fetchDrivers(CAPE_TOWN_CENTRAL);
            }
          );
        } else {
          setError('Geolocation is not supported by this browser.');
          setUserLocation(CAPE_TOWN_CENTRAL); // Set default location
          fetchDrivers(CAPE_TOWN_CENTRAL);
        }
      } else {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Location permission not granted');
        }

        try {
          location = await Location.getCurrentPositionAsync({});
          setUserLocation(location.coords);
          await fetchDrivers(location.coords);
        } catch (locationError) {
          setUserLocation(CAPE_TOWN_CENTRAL); // Set default location
          fetchDrivers(CAPE_TOWN_CENTRAL);
        }
      }
    } catch (generalError) {
      setError(`General error: ${generalError.message}`);
      setUserLocation(CAPE_TOWN_CENTRAL); // Set default location
      setLoading(false);
    }
  };

  const fetchDrivers = async (location) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, display_name, email, phone_number, suburb, price, profile_picture_url')
        .eq('role_id', await getDriverRoleId());

      if (error) {
        throw error;
      }

      setDrivers(data);
      setFilteredDrivers(data);
      setLoading(false);
    } catch (fetchError) {
      setError(`Error fetching drivers: ${fetchError.message}`);
      setLoading(false);
    }
  };

  const getDriverRoleId = async () => {
    const { data, error } = await supabase
      .from('roles')
      .select('id')
      .eq('role_name', 'Driver')
      .single(); // assuming each role_name is unique

    if (error || !data) {
      throw new Error('Failed to fetch driver role ID');
    }
    return data.id;
  };

  useEffect(() => {
    fetchLocationAndDrivers();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchDrivers(userLocation);
    }
  }, [userLocation]);

  const handleUpdateLocation = async () => {
    setLoading(true);
    await fetchLocationAndDrivers();
    setLoading(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter drivers based on search query
    const queryLower = query.toLowerCase();
    const filtered = drivers.filter(driver =>
      driver.display_name.toLowerCase().includes(queryLower)
    );
    setFilteredDrivers(filtered);
  };

  const handleHireDriver = async (driverId) => {
    try {
      Alert.alert('Hire Driver', 'Driver hired successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to hire driver');
      console.error('Hire Driver Error:', error);
    }
  };

  const handlePayDriver = async (driverId) => {
    try {
      Alert.alert('Pay Driver', 'Payment successful!');
    } catch (error) {
      Alert.alert('Error', 'Failed to pay driver');
      console.error('Pay Driver Error:', error);
    }
  };

  const handleMessageDriver = (driverId) => {
    navigation.navigate('ChatScreen', { otherUserId: driverId });
  };

  const handleProfilePress = (driverId) => {
    navigation.navigate('UserProfileScreen', { userId: driverId });
  };

  const renderItem = ({ item }) => (
    <DriverItem
      driver={item}
      onHire={() => handleHireDriver(item.id)}
      onPay={() => handlePayDriver(item.id)}
      onMessage={() => handleMessageDriver(item.id)}
      onProfilePress={() => handleProfilePress(item.id)}
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
        placeholder="Search drivers..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredDrivers}
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

export default Transport;
