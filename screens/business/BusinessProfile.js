import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../../supabaseClient'; // Adjust path as necessary

const BusinessProfile = () => {
  const [businessProfile, setBusinessProfile] = useState({
    businessName: '',
    description: '',
    address: '',
    contactNumber: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  // Load individual profile details
  useEffect(() => {
    const loadBusinessProfile = async () => {
      setLoading(true);
      try {
        const profileData = await fetchBusinessProfile();
        setBusinessProfile(profileData);
      } catch (error) {
        console.error('Error fetching business profile:', error);
        Alert.alert('Error', 'Unable to load business profile.');
      } finally {
        setLoading(false);
      }
    };
    loadBusinessProfile();
  }, []);

  // Function to fetch the business profile (this is a placeholder; replace with actual implementation)
  const fetchBusinessProfile = async () => {
    const { data, error } = await supabase
      .from('business_profiles')
      .select('*')
      .single(); // Assuming you want a single profile
    if (error) throw new Error(error.message);
    return data;
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
            onChangeText={(text) => setBusinessProfile({ ...businessProfile, businessName: text })}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.multiLineInput]}
            value={businessProfile.description}
            onChangeText={(text) => setBusinessProfile({ ...businessProfile, description: text })}
            multiline
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={businessProfile.address}
            onChangeText={(text) => setBusinessProfile({ ...businessProfile, address: text })}
          />


          <Text style={styles.note}>
            Note: Your app profile will be used to apply for becoming a hustler. 
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
    color: '#666', // Use a lighter color for the note to distinguish it
    marginTop: 20,
    textAlign: 'center', // Center the note for better alignment
  },
  multiLineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  businessContainer: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  businessTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  businessSlogan: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
});

export default BusinessProfile;
