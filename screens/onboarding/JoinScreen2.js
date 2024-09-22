import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Import the registered badge image
const registeredBadge = require('../../assets/images/Registered.png');

const JoinScreen2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover Local Opportunities!</Text>
      <Text style={styles.description}>
        Explore a variety of local products and odd jobs to connect with your community.
      </Text>
      
      {/* Grid layout */}
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <Image source={registeredBadge} style={styles.badgeImage} />
          <Text style={styles.featureText}>
            Look for sellers and job listings marked with this badge—they are verified and trustworthy.
          </Text>
        </View>
      </View>
      
      {/* Additional Information */}
      <Text style={styles.infoText}>
        Commiploy ensures that all listed products and job opportunities meet our high standards of quality and reliability.
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
