import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BecomeADriver = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Become a Driver Partner!</Text>
      <Text style={styles.subtitle}>
        Join our delivery team and make a difference today!
      </Text>
      
      <Text style={styles.sectionTitle}>What You Need:</Text>
      <Text style={styles.bulletPoint}>• Own smartphone with Android v7 or higher for the delivery app & GPS.</Text>
      <Text style={styles.bulletPoint}>• South African ID or Work Permit for foreign nationals.</Text>
      <Text style={styles.bulletPoint}>• Valid South African Driver’s License (or National/International License for foreign nationals).</Text>
      <Text style={styles.bulletPoint}>• Your own motorbike, light vehicle, or manual bicycle.</Text>
      <Text style={styles.bulletPoint}>• Proof of Address.</Text>
      <Text style={styles.bulletPoint}>• Proof of Bank Details.</Text>
      <Text style={styles.bulletPoint}>• Vehicle Registration Form (RC1) and valid Roadworthy Certificate.</Text>
      <Text style={styles.bulletPoint}>• Clear Criminal Record.</Text>
      <Text style={styles.bulletPoint}>• Must be older than 16 years to apply.</Text>

      <Text style={styles.sectionTitle}>Benefits of Working as an Independent Contractor:</Text>
      <Text style={styles.bulletPoint}>• Flexible working hours from Monday to Sunday.</Text>
      <Text style={styles.bulletPoint}>• Competitive rates offered during peak times.</Text>
      <Text style={styles.bulletPoint}>• Personal injury insurance for your protection while on duty.</Text>
      <Text style={styles.bulletPoint}>• Free training provided for successful applicants.</Text>
      <Text style={styles.bulletPoint}>• Access to a free road emergency response service.</Text>

      <TouchableOpacity style={styles.applyButton}>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#007BFF',
  },
  bulletPoint: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
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

export default BecomeADriver;
