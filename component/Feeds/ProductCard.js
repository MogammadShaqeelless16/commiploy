// ProductCard.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ProductCard = ({ product, navigation }) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
    >
      <Image source={{ uri: product.image_url }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>Price: R{product.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 12,
    color: '#888',
  },
});

export default ProductCard;
