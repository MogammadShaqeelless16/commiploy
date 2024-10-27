import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProfile = ({ profile }) => {
  if (!profile) return null;
  const { first_name = '', email = '', phone_number = '' } = profile;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Basic Information</Text>
      <Text style={styles.label}>Name: {first_name}</Text>
      <Text style={styles.label}>Email: {email}</Text>
      <Text style={styles.label}>Phone: {phone_number}</Text>
      
      {/* Informational note about profile usage */}
      <Text style={styles.note}>
        Note: Your app profile will be used to apply for becoming a hustler. 
        Please ensure you have your own account as using someone else's profile 
        is not allowed.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,  // Add some padding to the container for better layout
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  note: {
    fontSize: 14,
    color: '#666', // Use a lighter color for the note to distinguish it
    marginTop: 20,
    textAlign: 'center', // Center the note for better alignment
  },
});

export default UserProfile;
