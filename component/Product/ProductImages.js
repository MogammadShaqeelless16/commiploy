import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Image, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProductImages = ({ productImages, setProductImages }) => {
  const [imageDetails, setImageDetails] = useState({
    title: '',
    description: ''
  });

  const handleImageUpload = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        const newImage = { uri: result.assets[0].uri, title: '', description: '' };
        setProductImages([...productImages, newImage]);
      }
    }
  };

  const handleTitleChange = (index, title) => {
    const updatedImages = [...productImages];
    updatedImages[index].title = title;
    setProductImages(updatedImages);
  };

  const handleDescriptionChange = (index, description) => {
    const updatedImages = [...productImages];
    updatedImages[index].description = description;
    setProductImages(updatedImages);
  };

  return (
    <View>
      <Text style={styles.label}>Upload Product Images</Text>
      <Button title="Upload Images" onPress={handleImageUpload} />
      
      {productImages.length > 0 && (
        <View style={styles.imageContainer}>
          <Text style={styles.previewTitle}>Image Previews:</Text>
          <ScrollView horizontal>
            {productImages.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                
                <TextInput
                  style={styles.input}
                  placeholder="Image Title"
                  value={image.title}
                  onChangeText={(text) => handleTitleChange(index, text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Image Description"
                  value={image.description}
                  onChangeText={(text) => handleDescriptionChange(index, text)}
                  multiline
                />
              </View>
            ))}
          </ScrollView>
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
  previewTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  imageWrapper: {
    marginRight: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    width: 120,
  },
});

export default ProductImages;
