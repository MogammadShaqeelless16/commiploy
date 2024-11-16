import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProductImages = ({ productImages, setProductImages }) => {
  const handleImageUpload = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        setProductImages([...productImages, result.assets[0].uri]);
      }
    }
  };

  return (
    <View>
      <Text style={styles.label}>Upload Product Images</Text>
      <Button title="Upload Images" onPress={handleImageUpload} />
      {productImages.length > 0 && (
        <View style={styles.imageContainer}>
          {productImages.map((uri, index) => (
            <Text key={index} style={styles.imageText}>{uri}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  imageContainer: {
    marginTop: 10,
  },
  imageText: {
    color: '#555',
  },
});

export default ProductImages;
