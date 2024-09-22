import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import supabase from '../../supabaseClient';

const BusinessDetails = ({ route }) => {
  const { businessId } = route.params;
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBusinessDetails = async () => {
    setLoading(true);
    console.log("Fetching details for business ID:", businessId);
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', businessId)
        .single();

      console.log("Fetched Data:", data);
      if (error) {
        console.error("Error:", error);
        throw new Error('Error fetching business details');
      }

      setBusiness(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessDetails();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  if (!business) {
    return <Text style={styles.errorText}>No business details found for ID: {businessId}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.businessName}>{business.name}</Text>
      <Text style={styles.businessDetails}>Email: {business.email}</Text>
      <Text style={styles.businessDetails}>Address: {business.address}</Text>
      <Text style={styles.businessDetails}>Contact Number: {business.contact_number}</Text>
      <Text style={styles.businessDetails}>Description: {business.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  businessName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  businessDetails: {
    fontSize: 16,
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BusinessDetails;
