import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const ContactDetails = ({ contactDetails, setContactDetails }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Business Details</Text>
      
      <Text style={styles.label}>Contact Name:</Text>
      <TextInput
        style={styles.input}
        value={contactDetails.name}
        onChangeText={(text) => setContactDetails({ ...contactDetails, name: text })}
        placeholder="Enter contact name"
        placeholderTextColor="#A9A9A9" // Light gray for placeholder
      />
      
      <Text style={styles.label}>Contact Email:</Text>
      <TextInput
        style={styles.input}
        value={contactDetails.email}
        onChangeText={(text) => setContactDetails({ ...contactDetails, email: text })}
        placeholder="Enter contact email"
        keyboardType="email-address"
        placeholderTextColor="#A9A9A9" // Light gray for placeholder
      />
      
      <Text style={styles.label}>Contact Phone:</Text>
      <TextInput
        style={styles.input}
        value={contactDetails.phone}
        onChangeText={(text) => setContactDetails({ ...contactDetails, phone: text })}
        placeholder="Enter contact phone number"
        keyboardType="phone-pad"
        placeholderTextColor="#A9A9A9" // Light gray for placeholder
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F7F7F7', // Light background color
    borderRadius: 10,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#007BFF', // Border color
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff', // White background for input fields
  },
});

export default ContactDetails;
