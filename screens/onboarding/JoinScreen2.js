import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ArtBackground from '../../component/BackgroundSprites/ArtBackground';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const JoinScreen2 = () => {
  return (
    <ArtBackground>
      <View style={styles.container}>
        {/* Main text content */}
        <Text style={styles.heading}>Not sure what local businesses have to offer?</Text>

          <Text style={styles.subheading}>Browse, buy, and boost your community - all in one app</Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginTop: 20,
  },
  bottomTextContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  subheading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
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

export default JoinScreen2;
