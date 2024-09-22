import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import supabase from '../supabaseClient';
import ProfileAlert from '../component/user/ProfileAlert';
import AddProductButton from '../component/Articles/AddProductButton';
import ProductItem from './ProductItem';

const FeedsList = ({ navigation }) => {
  const [profile, setProfile] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchProducts();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        throw new Error('Unable to fetch user session');
      }

      const { data, error } = await supabase
        .from('users')
        .select('id, display_name')
        .eq('id', session.user.id)
        .single();

      if (error) {
        throw new Error('Error fetching profile data');
      }

      setProfile(data);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Profile Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products') // Assuming the table is named 'products'
        .select('*, shop:businesses(name)') // Fetch shop name using the relationship
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error('Error fetching products');
      }

      setProducts(data);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Products Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProducts(); // Refresh products
    setRefreshing(false);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text style={styles.title}>Products</Text>
          <AddProductButton /> {/* Button to add new products */}
        </View>
      )}
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
          <ProductItem product={item} />
        </TouchableOpacity>
      )}
      numColumns={2} // Set number of columns to 2
      columnWrapperStyle={styles.row} // Style for the rows
      ListEmptyComponent={<Text style={styles.noProductsText}>No products available.</Text>}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noProductsText: {
    textAlign: 'center',
    margin: 20,
    fontSize: 16,
    color: '#888',
  },
  row: {
    justifyContent: 'space-between', // Space between items in a row
  },
});

export default FeedsList;
