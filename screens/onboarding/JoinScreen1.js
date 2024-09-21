import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Import the logo image
const logo = require('../../assets/images/logo.png');

const JoinScreen1 = () => {
  return (
    <View style={styles.container}>
      {/* Display the logo */}
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Welcome to CrecheSpots!</Text>
      <Text style={styles.description}>
        Discover the best creche options available for your little ones.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150, // Adjust the size of the logo as needed
    height: 150, // Adjust the size of the logo as needed
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});

export default JoinScreen1;
