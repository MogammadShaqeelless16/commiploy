import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, TextInput , TouchableOpacity } from 'react-native';
import supabase from '../supabaseClient'; // Ensure the correct import path
import { useNavigation } from '@react-navigation/native';
import ServiceItem from './services/ServiceItem';
import Icon from 'react-native-vector-icons/FontAwesome';
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

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => console.log('Filter pressed')}>
          <Icon name="filter" size={20} color="#007bff" />
        </TouchableOpacity>
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default Services;
