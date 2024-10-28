import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library
import ArtBackground from '../../component/BackgroundSprites/ArtBackground';

const { width: screenWidth } = Dimensions.get('window');


const JoinScreen4 = ({ navigation }) => {
  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      if (navigation && navigation.navigate) {
        navigation.navigate('Login'); // Navigate to the Login screen
      } else {
        console.error('Navigation prop or navigate method is undefined');
      }
    } catch (error) {
      console.error('Failed to set onboarding status:', error);
    }
  };

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
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  gridItem: {
    width: '48%', // Adjust to fit two items per row
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
  },
  featureLabel: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JoinScreen4;
