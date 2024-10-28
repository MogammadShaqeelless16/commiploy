import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ArtBackground from '../../component/BackgroundSprites/ArtBackground';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const JoinScreen3 = () => {
  return (
    <ArtBackground>
      <View style={styles.container}>
        {/* Main text content */}
        <Text style={styles.heading}>Looking to earn extra money with your skills?</Text>

          <Text style={styles.subheading}>Get hired and build your reputation with us!
          </Text>
        <View style={styles.bottomTextContainer}>
          <Text style={styles.pinkText}>Quick, easy, and safe.</Text>
        </View>
      </View>
    </ArtBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    textAlign: 'left',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    marginTop: 50,
  },
  bottomTextContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  subheading: {
    marginTop: 10,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    marginVertical: 5,
  },
  pinkText: {
    fontSize: 28,
    textAlign: 'center',
    color: '#ff54b5',
    marginVertical: 5,
  },
});

export default JoinScreen3;
