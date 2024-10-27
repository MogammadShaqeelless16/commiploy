import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const JoinScreen2 = () => {
  return (
    <View style={styles.container}>
      {/* Background shop shapes */}
      <View style={[styles.shopShape, styles.yellowShop]} />
      <View style={[styles.shopShape, styles.greenShop]} />
      <View style={[styles.shopShape, styles.redShop]} />
      <View style={[styles.shopShape, styles.orangeShop]} />
      <View style={[styles.shopShape, styles.blueShop]} />

      {/* Main text content */}
      <Text style={styles.heading}>Not sure what local businesses have to offer?</Text>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.subheading}>Browse, buy, and boost your community - all in one app</Text>
        <Text style={styles.pinkText}>Quick, easy, and safe.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  // Base style for shop shapes
  shopShape: {
    position: 'absolute',
    opacity: 0.5,
  },
  // Unique styles for each "shop" shape
  yellowShop: {
    backgroundColor: '#f6bc1d',
    width: 120,
    height: 70,
    borderRadius: 15,
    transform: [{ rotate: '10deg' }],
    top: 60,
    left: 20,
  },
  greenShop: {
    backgroundColor: '#5baf31',
    width: 100,
    height: 100,
    borderRadius: 50,
    top: 250,
    right: 30,
  },
  redShop: {
    backgroundColor: '#df0050',
    width: 150,
    height: 80,
    borderRadius: 30,
    transform: [{ rotate: '-15deg' }],
    bottom: 130,
    left: 50,
  },
  orangeShop: {
    backgroundColor: '#eb692d',
    width: 80,
    height: 80,
    borderRadius: 40,
    bottom: 220,
    right: 80,
  },
  blueShop: {
    backgroundColor: '#029eb0',
    width: 140,
    height: 100,
    borderRadius: 20,
    transform: [{ rotate: '20deg' }],
    top: 150,
    left: 120,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginTop: 20,
  },
  bottomTextContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  subheading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    marginVertical: 5,
  },
  pinkText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ff54b5',
    marginVertical: 5,
  },
});

export default JoinScreen2;
