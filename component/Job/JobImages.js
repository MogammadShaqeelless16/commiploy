// JobImages.js
import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Using expo-image-picker for image uploads

const JobImages = ({ jobImages, setJobImages }) => {
  const handleImageUpload = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        setJobImages([...jobImages, result.assets[0].uri]);
      }
    }
  };

  return (
    <View>
      <Text style={styles.label}>Upload Images</Text>
      <Button title="Upload Images" onPress={handleImageUpload} />
      {jobImages.length > 0 && (
        <View style={styles.imageContainer}>
          {jobImages.map((uri, index) => (
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

export default JobImages;
