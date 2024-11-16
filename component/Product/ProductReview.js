import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProductReview = ({ productDetails, productLocation, productImages, handleSubmit }) => {
  return (
    <View>
      <Text style={styles.label}>Review Your Product Listing</Text>
      <Text style={styles.details}>Name: {productDetails.name}</Text>
      <Text style={styles.details}>Description: {productDetails.description}</Text>
      <Text style={styles.details}>Price: ${productDetails.price}</Text>
      <Text style={styles.details}>Location: {productLocation.address}</Text>
      <Text style={styles.label}>Images:</Text>
      {productImages.map((uri, index) => (
        <Text key={index} style={styles.imageText}>{uri}</Text>
      ))}
      <Button title="Submit Product" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    marginBottom: 3,
  },
  imageText: {
    color: '#555',
  },
});

export default ProductReview;
