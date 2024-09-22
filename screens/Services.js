import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, TextInput } from 'react-native';
import supabase from '../supabaseClient'; // Ensure the correct import path
import { useNavigation } from '@react-navigation/native';
import ServiceItem from './services/ServiceItem';
import Loading from '../component/loadingComponent/loading';
import Error from '../component/loadingComponent/Error';
import LocationDisplay from '../component/LocationDisplay'; // Import the LocationDisplay component

const Services = () => {
  const navigation = useNavigation();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchServices = async () => {
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
    fetchServices();
  }, []);

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
      <LocationDisplay /> {/* Include the LocationDisplay component */}

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
