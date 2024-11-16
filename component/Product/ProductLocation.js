import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const ProductLocation = ({ productLocation, setProductLocation }) => {
  return (
    <View>
      <Text style={styles.label}>Product Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product location"
        value={productLocation.address}
        onChangeText={(text) => setProductLocation({ ...productLocation, address: text })}
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

export default ProductLocation;
