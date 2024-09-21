import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const ProfileAlert = ({ completion, onClose }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.profileAlert}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Icon name="close" size={24} color="#856404" />
      </TouchableOpacity>
      <Text style={styles.alertTitle}>Profile Incomplete</Text>
      <Text style={styles.alertMessage}>
        Your profile is {Math.round(completion)}% complete. Please update your profile to ensure all information is filled out.
      </Text>
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileAlert: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeeba',
    borderRadius: 5,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    position: 'relative', // Position relative to allow absolute positioning of close button
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensure it is above other elements
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  alertMessage: {
    fontSize: 16,
    color: '#856404',
    marginBottom: 12,
  },
  updateButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileAlert;
