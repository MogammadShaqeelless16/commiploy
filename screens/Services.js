import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
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
  const [numColumns, setNumColumns] = useState(2); // Default columns for mobile view

  // Dynamically adjust columns based on screen width
  useEffect(() => {
    const updateNumColumns = () => {
      const screenWidth = Dimensions.get('window').width;
      if (screenWidth > 800) {
        setNumColumns(4); // Larger screen
      } else if (screenWidth > 600) {
        setNumColumns(3); // Medium-sized screen
      } else {
        setNumColumns(2); // Mobile screen
      }
    };

    updateNumColumns(); // Initial setup

    // Add listener for screen size changes
    const subscription = Dimensions.addEventListener('change', updateNumColumns);
    return () => subscription?.remove();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('id, name, description, price, call_out_fee, created_at, updated_at')
        .eq('is_available', true);

      if (error) throw error;

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
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => console.log('Filter pressed')}>
          <Icon name="filter" size={20} color="#007bff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredServices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns} // Adjust the number of columns dynamically
        key={numColumns} // Re-render on column change for layout consistency
        contentContainerStyle={styles.listContainer}
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
  listContainer: {
    alignItems: 'center', // Center content when there are fewer columns
  },
});

export default Services;
