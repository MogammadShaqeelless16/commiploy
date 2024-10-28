import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TextInput, Image, TouchableOpacity, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import supabase from '../supabaseClient';
import placeholderImage from '../assets/images/itemplaceholder.jpg';
import Loading from '../component/loadingComponent/loading';

const ProductsList = ({ route, navigation }) => {
  const { category = '' } = route.params || {}; // Safely access category

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    const updateNumColumns = () => {
      const screenWidth = Dimensions.get('window').width;
      if (screenWidth > 1200) {
        setNumColumns(4); // Show 4 columns on very large screens
      } else if (screenWidth > 800) {
        setNumColumns(3); // Show 3 columns on desktop
      } else {
        setNumColumns(2); // Default to 2 columns on smaller screens
      }
    };

    updateNumColumns(); // Initial check
    Dimensions.addEventListener('change', updateNumColumns); // Add event listener for screen size changes
    return () => Dimensions.removeEventListener('change', updateNumColumns); // Cleanup on unmount
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, shop_id:businesses(*)')
        .eq('category', category);

      if (error) throw new Error('Error fetching products');

      if (data.length === 0) {
        const { data: allProducts, error: allProductsError } = await supabase
          .from('products')
          .select('*, shop_id:businesses(*)');

        if (allProductsError) throw new Error('Error fetching all products');

        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } else {
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const price = product.price || 0;
      const matchesMinPrice = minPrice ? price >= parseFloat(minPrice) : true;
      const matchesMaxPrice = maxPrice ? price <= parseFloat(maxPrice) : true;
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;

      return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchQuery, minPrice, maxPrice, products, selectedCategory]);

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

      <View style={styles.filterContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Select Min Price', value: null }}
          items={[
            { label: 'No Min', value: '' },
            { label: 'R0 - R100', value: '0,100' },
            { label: 'R100 - R500', value: '100,500' },
            { label: 'R500 - R1000', value: '500,1000' },
            { label: 'Above R1000', value: '1000,' },
          ]}
          onValueChange={(value) => {
            if (value) {
              const [min, max] = value.split(',');
              setMinPrice(min);
              setMaxPrice(max || '');
            } else {
              setMinPrice('');
              setMaxPrice('');
            }
          }}
          style={pickerSelectStyles}
        />
        <RNPickerSelect
          placeholder={{ label: 'Select Category', value: null }}
          items={[
            { label: 'All Categories', value: '' },
            { label: 'Electronics', value: 'Electronics' },
            { label: 'Home Appliances', value: 'Home Appliances' },
            { label: 'Health', value: 'Health' }, 
            { label: 'Food', value: 'Food' },
            { label: 'Clothes', value: 'Clothes' },
            { label: 'Groceries', value: 'Groceries' },
          ]}
          onValueChange={(value) => setSelectedCategory(value)}
          style={pickerSelectStyles}
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Loading />;
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
          numColumns={numColumns}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    marginRight: 10,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    marginRight: 10,
    marginBottom: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
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
    flex: 1, // Make each product flex in the row
  },
  productImage: {
    width: '100%',
    height: 100,
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
});

export default ProductsList;
