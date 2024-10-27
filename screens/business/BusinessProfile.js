import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../../supabaseClient'; // Adjust path as necessary

const BusinessProfile = ({ businessProfile, setBusinessProfile }) => {
  const [loading, setLoading] = useState(false);


  const handleInputChange = (field, value) => {
    console.log(`Changing ${field} to:`, value);
    setBusinessProfile({ ...businessProfile, [field]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <>
          <Text style={styles.header}>Business Profile</Text>

          <Text style={styles.label}>Business Name</Text>
          <TextInput
            style={styles.input}
            value={businessProfile.businessName}
            onChangeText={(text) => handleInputChange('businessName', text)}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.multiLineInput]}
            value={businessProfile.description}
            onChangeText={(text) => handleInputChange('description', text)}
            multiline
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={businessProfile.address}
            onChangeText={(text) => handleInputChange('address', text)}
          />

          <Text style={styles.note}>
            Note: Your app profile will be used to apply for business Profile. 
            Please ensure you have your own account as using someone else's profile 
            is not allowed.
          </Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#007BFF',
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  note: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  multiLineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default BusinessProfile;
