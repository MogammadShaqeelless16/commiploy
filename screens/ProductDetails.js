import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Image } from 'react-native';
import supabase from '../supabaseClient';
import { Ionicons } from '@expo/vector-icons';

const ProductDetails = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, shop_id:businesses(*)')
        .eq('id', productId)
        .single();

      if (error) {
        throw new Error('Error fetching product details');
      }

      setProduct(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleBuyPress = () => {
    Alert.alert('Buy Product', 'Feature to buy the product will be implemented.');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  if (!product) {
    return <Text style={styles.errorText}>No product details found.</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#007bff" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Display the product image */}
      <Image 
        source={{ uri: product.image_url }} 
        style={styles.productImage} 
        resizeMode="contain" 
      />

      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productPrice}>Price: R{product.price.toFixed(2)}</Text>
      
      {/* Display the rating */}
      <Text style={styles.productRating}>Rating: {product.rating ? product.rating.toFixed(1) : 'Not rated yet'}</Text>

      <View style={styles.shopContainer}>
        <Text style={styles.shopTitle}>Sold by: {product.shop_id.name}</Text>
        <Text style={styles.shopDetails}>Address: {product.shop_id.address}</Text>
        <Text style={styles.shopDetails}>Contact: {product.shop_id.contact_number}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleBuyPress}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 8,
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  productRating: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  shopContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  shopTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  shopDetails: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 18,
  },
});

export default ProductDetails;
