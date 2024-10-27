import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TextInput, Image, TouchableOpacity } from 'react-native';
import supabase from '../supabaseClient';
import placeholderImage from '../assets/images/itemplaceholder.jpg'; // Adjust the path as necessary

const ProductsList = ({ route, navigation }) => {
  const { category = '' } = route.params || {}; // Safely access category

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, shop_id:businesses(*)')
        .eq('category', category); // Filter by category

      if (error) {
        throw new Error('Error fetching products');
      }

      // Check if there are products in the selected category
      if (data.length === 0) {
        // Fetch all products if no products found in the selected category
        const { data: allProducts, error: allProductsError } = await supabase
          .from('products')
          .select('*, shop_id:businesses(*)');

        if (allProductsError) {
          throw new Error('Error fetching all products');
        }

        setProducts(allProducts);
        setFilteredProducts(allProducts); // Initialize filtered products
      } else {
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products with category data
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]); // Refetch when category changes

  useEffect(() => {
    const filtered = products.filter(product => {
      // Check if the product matches the search query
      const matchesSearch = product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Check if the product matches the price range
      const price = product.price || 0; // Default to 0 if price is undefined
      const matchesMinPrice = minPrice ? price >= parseFloat(minPrice) : true;
      const matchesMaxPrice = maxPrice ? price <= parseFloat(maxPrice) : true;

      return matchesSearch && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredProducts(filtered);
  }, [searchQuery, minPrice, maxPrice, products]);

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
      <Image
        source={item.image_url ? { uri: item.image_url } : placeholderImage}
        style={styles.productImage}
      />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>Price: R{item.price.toFixed(2)}</Text>
      {item.shop_id && <Text style={styles.shopName}>Sold by: {item.shop_id.name}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.priceFilterContainer}>
        <TextInput
          style={styles.priceInput}
          placeholder="Min Price"
          keyboardType="numeric"
          value={minPrice}
          onChangeText={setMinPrice}
        />
        <TextInput
          style={styles.priceInput}
          placeholder="Max Price"
          keyboardType="numeric"
          value={maxPrice}
          onChangeText={setMaxPrice}
        />
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No products found in this category.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
    flex: 0.48,
  },
  productImage: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: 'bold',
  },
  shopName: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  priceFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    height: 40,
  },
});

export default ProductsList;
