import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const YouthEmployment = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Youth Employment Opportunities</Text>
      <Text style={styles.description}>
        If you have a bike and a South African ID, you can apply for employment opportunities with us.
      </Text>
      <Text style={styles.requirementsHeader}>What You Need:</Text>
      <Text style={styles.requirementItem}>• South African ID.</Text>
      <Text style={styles.requirementItem}>• Your own motorbike.</Text>
      <Text style={styles.requirementItem}>• Proof of Bank details.</Text>

      <TouchableOpacity style={styles.applyButton} onPress={() => {/* Navigate to application form */}}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  requirementsHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#007bff',
  },
  requirementItem: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default YouthEmployment;
