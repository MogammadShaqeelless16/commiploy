import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const { width: screenWidth } = Dimensions.get('window');

const features = [
  { label: 'Application', icon: 'description', color: '#4a90e2' }, // Blue
  { label: 'Fee Payment', icon: 'payment', color: '#e94e77' }, // Pink
  { label: 'Creche Listing', icon: 'list', color: '#f5a623' }, // Orange
  { label: 'Local News', icon: 'announcement', color: '#50e3c2' }, // Teal
];

const JoinScreen3 = ({ navigation }) => {
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
    <View style={styles.container}>
      <Text style={styles.title}>Get Started Today!</Text>
      <Text style={styles.description}>
        Discover our features and complete your profile to get the most out of CrecheSpots.
      </Text>
      <View style={styles.gridContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.gridItem}>
            <Icon name={feature.icon} size={60} color={feature.color} style={styles.icon} />
            <Text style={styles.featureLabel}>{feature.label}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.instructions}>
        To get started, please complete your profile with your information.
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

export default JoinScreen3;
