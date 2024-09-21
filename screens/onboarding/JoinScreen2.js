import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Import the registered badge image
const registeredBadge = require('../../assets/images/Registered.png');

const JoinScreen2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find the Perfect Creche!</Text>
      <Text style={styles.description}>
        Browse through a variety of options to find the best fit for your child.
      </Text>
      
      {/* Grid layout */}
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <Image source={registeredBadge} style={styles.badgeImage} />
          <Text style={styles.featureText}>
            Look out for creches with this badge, as these are registered and verified.
          </Text>
        </View>
      </View>
      
      {/* Additional Information */}
      <Text style={styles.infoText}>
        CrecheSpots ensures that all registered creches meet our high standards of quality and safety.
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
    marginBottom: 20,
  },
  gridContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  gridItem: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  badgeImage: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});

export default JoinScreen2;
