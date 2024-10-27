import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Loading.gif')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // White background
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default Loading;
