import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ProductCard = ({ product }) => (
  <View style={styles.card}>
    <MaterialIcons name="shopping-cart" size={24} color="black" />
    <Text style={styles.cardTitle}>{product.title} - {product.price}</Text>
    <Text>{product.description}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 150,
    padding: 10,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  cardTitle: {
    fontWeight: 'bold',
  },
});

export default ProductCard;
