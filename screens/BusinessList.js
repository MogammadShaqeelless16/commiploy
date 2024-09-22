import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import supabase from '../supabaseClient';
import LocationDisplay from '../component/LocationDisplay';

const BusinessList = ({ navigation }) => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('id, name, slogan, header_image')
          .order('name', { ascending: true });

        if (error) {
          throw new Error(error.message);
        }

        setBusinesses(data);
        setFilteredBusinesses(data); // Initialize filtered businesses
      } catch (fetchError) {
        console.error('Error fetching businesses:', fetchError.message);
        Alert.alert('Error', fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = businesses.filter(business =>
        business.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBusinesses(filtered);
    } else {
      setFilteredBusinesses(businesses);
    }
  };

  const renderBusinessItem = ({ item }) => (
    <TouchableOpacity
      style={styles.businessCard}
      onPress={() => navigation.navigate('BusinessDetails', { businessId: item.id })}
    >
      <Image source={{ uri: item.header_image }} style={styles.logo} />
      <Text style={styles.businessName}>{item.name}</Text>
      <Text style={styles.slogan}>{item.slogan}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (filteredBusinesses.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No businesses found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LocationDisplay />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a business..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredBusinesses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBusinessItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No businesses found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  businessCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    flex: 1, // Ensure cards fill the space
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  logo: {
    width: '100%',
    height: 100, // Adjusted height for better display
    borderRadius: 8,
    marginBottom: 8,
  },
  businessName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  businessDescription: {
    fontSize: 12,
    color: '#555',
  },
  row: {
    justifyContent: 'space-between', // Adjust space between columns
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});

export default BusinessList;
