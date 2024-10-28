import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Linking, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { fetchProfile } from '../component/UserOperations/fetchProfile'; // Import fetchProfile

// Import images for mobile and desktop
const mobileImage = require('../assets/images/hustler_mobile.png');
const desktopImage = require('../assets/images/hustler.png');

const BecomeAHustler = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [hasAccount, setHasAccount] = useState(false); // State to check if user has an account
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [imageSource, setImageSource] = useState(mobileImage); // Default to mobile image

  // Check if user has an account on mount
  useEffect(() => {
    const checkUserAccount = async () => {
      try {
        const profile = await fetchProfile(); // Fetch user profile
        if (profile) {
          setHasAccount(true); // User has an account
        } else {
          setHasAccount(false); // User does not have an account
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setHasAccount(false); // Assume no account on error
      }
    };

    checkUserAccount();
    handleResponsiveImage();
    
    // Add an event listener for orientation change
    const subscription = Dimensions.addEventListener('change', handleResponsiveImage);
    
    return () => {
      subscription?.remove(); // Cleanup the event listener
    };
  }, []);

  // Function to determine the correct image based on screen width
  const handleResponsiveImage = () => {
    const { width } = Dimensions.get('window');
    // If width is less than 768px, consider it mobile; otherwise desktop
    setImageSource(width < 768 ? mobileImage : desktopImage);
  };

  // Function to navigate to ApplyForHustler screen
  const handleApplyPress = () => {
    if (!hasAccount) {
      setModalVisible(true); // Show modal if user does not have an account
    } else {
      navigation.navigate('ApplyForHustler'); // Navigate to ApplyForHustler screen if user has an account
    }
  };

  // Function to open the FNB account link
  const handleFNBAccountPress = () => {
    const url = "https://www.fnb.co.za/business-banking/accounts/solopreneur-bundle/index.html";
    Linking.openURL(url);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}> {/* Wrap the content in ScrollView */}
      <Text style={styles.title}>Become a Hustler</Text>
      <Text style={styles.subtitle}>
        Apply for freelance opportunities for odd jobs!
      </Text>

      <Image source={imageSource} style={styles.image} /> {/* Use responsive image */}

      <TouchableOpacity style={styles.applyButton} onPress={handleFNBAccountPress}>
        <Text style={styles.applyButtonText}>Don't have an account? Apply with FNB</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.applyButton} onPress={handleApplyPress}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>

      {/* Modal Overlay */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Account Required</Text>
            <Text style={styles.modalMessage}>You need to have an account to become a hustler. Would you like to create one?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleSignUp}>
              <Text style={styles.modalButtonText}>Yes, Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allow the content to grow
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
  image: {
    width: '100%', // Adjusted for better responsiveness
    resizeMode: 'contain', // Maintain aspect ratio
    marginBottom: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BecomeAHustler;
