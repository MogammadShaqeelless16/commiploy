import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../../supabaseClient'; // Adjust path as necessary

const BusinessProfile = () => {
  const [businessProfile, setBusinessProfile] = useState({
    businessName: '',
    description: '',
    address: '',
    contactNumber: '',
    email: '',
  });
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load individual profile details
  useEffect(() => {
    const loadBusinessProfile = async () => {
      try {
        const profileData = await fetchBusinessProfile();
        setBusinessProfile(profileData);
      } catch (error) {
        console.error('Error fetching business profile:', error);
        Alert.alert('Error', 'Unable to load business profile.');
      }
    };
    loadBusinessProfile();
  }, []);

  // Load all businesses
  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('id, name, slogan, header_image')
          .order('name', { ascending: true });

        if (error) {
          throw new Error(error.message);
        }
        setBusinesses(data);
        setFilteredBusinesses(data); // Initialize filtered businesses
      } catch (fetchError) {
        console.error('Error fetching businesses:', fetchError.message);
        Alert.alert('Error', fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const handleSaveProfile = async () => {
    try {
      await updateBusinessProfile(businessProfile);
      Alert.alert('Success', 'Business profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating business profile:', error);
      Alert.alert('Error', 'Failed to update business profile.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Business Profile</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        businesses.map((business) => (
          <View key={business.id} style={styles.businessContainer}>
            <Text style={styles.businessTitle}>{business.name}</Text>
            <Text style={styles.businessSlogan}>{business.slogan}</Text>
          </View>
        ))
      )}

      <Text style={styles.label}>Business Name</Text>
      <TextInput
        style={styles.input}
        value={businessProfile.businessName}
        editable={isEditing}
        onChangeText={(text) => setBusinessProfile({ ...businessProfile, businessName: text })}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiLineInput]}
        value={businessProfile.description}
        editable={isEditing}
        multiline
        onChangeText={(text) => setBusinessProfile({ ...businessProfile, description: text })}
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={businessProfile.address}
        editable={isEditing}
        onChangeText={(text) => setBusinessProfile({ ...businessProfile, address: text })}
      />

      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.input}
        value={businessProfile.contactNumber}
        editable={isEditing}
        keyboardType="phone-pad"
        onChangeText={(text) => setBusinessProfile({ ...businessProfile, contactNumber: text })}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={businessProfile.email}
        editable={isEditing}
        keyboardType="email-address"
        onChangeText={(text) => setBusinessProfile({ ...businessProfile, email: text })}
      />

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <Button title="Save" onPress={handleSaveProfile} color="#4CAF50" />
        ) : (
          <Button title="Edit" onPress={() => setIsEditing(true)} color="#007BFF" />
        )}
      </View>
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
