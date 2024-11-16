import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const ProductDetails = ({ productDetails, setProductDetails }) => {
  return (
    <View>
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={productDetails.name}
        onChangeText={(text) => setProductDetails({ ...productDetails, name: text })}
      />
      <Text style={styles.label}>Product Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product description"
        value={productDetails.description}
        onChangeText={(text) => setProductDetails({ ...productDetails, description: text })}
        multiline
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={productDetails.price}
        onChangeText={(text) => setProductDetails({ ...productDetails, price: text })}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ProductDetails;
