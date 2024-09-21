// /user/ProfileImage.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ProfileImage = ({ uri, size = 80 }) => {
  return (
    <Image
      source={{ uri: uri || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106' }}
      style={[styles.image, { width: size, height: size }]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 40,
  },
});

export default ProfileImage;
