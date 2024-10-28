import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fetchProfile } from '../UserOperations/fetchProfile'; // Importing fetchProfile
import logoImage from '../../assets/images/logo.png'; // Replace with your actual logo image path
import Loading from '../loadingComponent/loading';

const WelcomeMessage = () => {
  const [user, setUser] = useState(null); // State to hold user information
  const [loading, setLoading] = useState(true); // Loading state for async operation

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const profile = await fetchProfile(); // Fetch the user profile
        setUser(profile); // Set the user state with fetched profile
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false); // Update loading state
      }
    };

    getUserProfile(); // Call the function to fetch user profile
  }, []);

  // Determine the welcome text based on user login status
  const welcomeText = loading 
    ? <Loading />
    : user 
      ? `Welcome, ${user.first_name}!` 
      : 'Welcome to Commiploy';

  return (
    <View style={styles.Welcontainer}>
      <View style={styles.welcomeContainer}>
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />
        <Text style={styles.welcomeText}>{welcomeText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Welcontainer: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'start',
    marginBottom: 40,
    paddingLeft: 30,
  },
  welcomeContainer: {
    flexDirection: 'row', // Align logo and text in a row
    alignItems: 'start', // Center align items vertically
  },
  logo: {
    width: 30, // Set logo width to 30
    height: 30, // Set logo height to 30
    marginRight: 10, // Space between logo and text
  },
  welcomeText: {
    fontSize: 20,
    paddingBottom: 10, // Adjust font size as needed
    fontWeight: 'bold',
    textAlign: 'left', // Align text to the left
  },
});

export default WelcomeMessage;
