import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductItem = ({ product }) => (
  <View style={styles.productCard}>
    <Image source={{ uri: product.image_url }} style={styles.productImage} />
    <Text style={styles.productName}>{product.name}</Text>
    <Text style={styles.productDescription}>{product.description}</Text>
    <Text style={styles.productPrice}>${product.price}</Text>
    {product.shop && ( // Check if shop data is available
      <Text style={styles.shopName}>Sold by: {product.shop.name}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productImage: {
    width: '100%',
    height: 50,
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#4a90e2',
    marginTop: 4,
  },
  shopName: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default ProductItem;
