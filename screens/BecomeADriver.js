import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const BecomeADriver = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Become a Driver Partner</Text>
      <Text style={styles.subHeader}>
        Join the Takealot.com Delivery Team Today!
      </Text>

      <Text style={styles.requirementsHeader}>What You Need:</Text>
      <Text style={styles.requirementItem}>• Own smartphone with Android V7 or higher for the delivery app & GPS.</Text>
      <Text style={styles.requirementItem}>• South African ID or Work Permit for foreign nationals.</Text>
      <Text style={styles.requirementItem}>• Valid SA Driver’s License.</Text>
      <Text style={styles.requirementItem}>• National / International Driver’s License (Foreign Nationals).</Text>
      <Text style={styles.requirementItem}>• Your own motorbike or light vehicle.</Text>
      <Text style={styles.requirementItem}>• Proof of Address.</Text>
      <Text style={styles.requirementItem}>• Proof of Bank details.</Text>
      <Text style={styles.requirementItem}>• Vehicle Registration form (RC1).</Text>
      <Text style={styles.requirementItem}>• Valid Roadworthy Certificate.</Text>
      <Text style={styles.requirementItem}>• Clear criminal record.</Text>

      <Text style={styles.benefitsHeader}>Benefits of Working as an Independent Contractor:</Text>
      <Text style={styles.benefitItem}>• We operate from Monday to Sunday.</Text>
      <Text style={styles.benefitItem}>• Premium rates offered from Friday to Sunday.</Text>
      <Text style={styles.benefitItem}>• Personal injury insurance offered.</Text>
      <Text style={styles.benefitItem}>• Free training provided to successful applicants.</Text>
      <Text style={styles.benefitItem}>• Access to free road emergency response service.</Text>

      <TouchableOpacity style={styles.applyButton} onPress={() => {/* Navigate to application form or relevant screen */}}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>

      <Text style={styles.youthHeader}>Youth Employment Opportunities</Text>
      <Text style={styles.youthDescription}>
        If you have a bike and a South African ID, you can apply for employment opportunities with us.
      </Text>
      <Text style={styles.youthRequirementsHeader}>What You Need:</Text>
      <Text style={styles.requirementItem}>• South African ID.</Text>
      <Text style={styles.requirementItem}>• Your own motorbike.</Text>
      <Text style={styles.requirementItem}>• Proof of Bank details.</Text>

      <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('YouthEmployment')}>
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
  subHeader: {
    fontSize: 18,
    marginBottom: 20,
    color: '#555',
  },
  requirementsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#007bff',
  },
  requirementItem: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  benefitsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#28a745',
  },
  benefitItem: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  youthHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#28a745',
  },
  youthDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  youthRequirementsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#007bff',
  },
});

export default BecomeADriver;
