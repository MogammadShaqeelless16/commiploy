import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Image1 = require('../assets/images/hustler.jpeg');

const BecomeAHustler = () => {
  const navigation = useNavigation(); // Initialize navigation

  // Function to navigate to ApplyForHustler screen
  const handleApplyPress = () => {
    navigation.navigate('ApplyForHustler'); // Navigate to ApplyForHustler screen
  };

  // Function to open the FNB account link
  const handleFNBAccountPress = () => {
    const url = "https://www.fnb.co.za/business-banking/accounts/solopreneur-bundle/index.html";
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Become a Hustler</Text>
      <Text style={styles.subtitle}>
        Apply for freelance opportunities for odd jobs!
      </Text>

      <Image source={Image1} style={styles.Image1} />

      <TouchableOpacity style={styles.applyButton} onPress={handleFNBAccountPress}>
        <Text style={styles.applyButtonText}>Don't have an account? Apply with FNB</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.applyButton} onPress={handleApplyPress}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  Image1: {
    width: '30vh',
    height: '28vh',
  },
  applyButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BecomeAHustler;
