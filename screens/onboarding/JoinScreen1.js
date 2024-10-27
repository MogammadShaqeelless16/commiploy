import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Import the logo image
const logo = require('../../assets/images/logo.png');

const JoinScreen1 = () => {
  return (
    <View style={styles.container}>
      {/* Display the welcome message */}
      <Text style={styles.welcomeText}>Welcome to</Text>
      
      {/* Display the logo */}
      <Image source={logo} style={styles.logo} />

      {/* Display "Commiploy" with styling */}
      <Text style={styles.brandText}>
        <Text style={styles.comm}>Commi</Text>
        <Text style={styles.ploy}>ploy</Text>
      </Text>

      {/* Display the description text */}
      <Text style={styles.description}>
        A platform created{'\n'}for communities,{'\n'}by communities
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
  welcomeText: {
    fontSize: 43,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 200, // Adjust the size of the logo as needed
    height: 200, // Adjust the size of the logo as needed
    marginBottom: 10,
  },
  brandText: {
    fontSize: 43,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  comm: {
    color: '#000', // Black color for "Comm"
  },
  ploy: {
    color: '#7ed957',
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ff54b5', // Custom pink color
    lineHeight: 24,
  },
});

export default JoinScreen1;
