import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import placeholderImage from '../../assets/images/itemplaceholder.jpg'; // Adjust the path as necessary

const ProductCard = ({ product }) => (
  <TouchableOpacity style={styles.card}>
    <Image
      source={product.image_url ? { uri: product.image_url } : placeholderImage}
      style={styles.productImage}
    />
    <View style={styles.textContainer}>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {product.title}
      </Text>
      <Text style={styles.price}>R {product.price.toFixed(2)}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    marginRight: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    overflow: 'hidden', // Ensures rounded corners for the image
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: 'cover', // Maintain aspect ratio
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e91e63', // Highlight price with a different color
  },
});

export default ProductCard;
