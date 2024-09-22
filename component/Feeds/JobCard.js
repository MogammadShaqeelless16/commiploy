import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome

const JobCard = ({ job }) => {
  if (!job) return null; // Handle undefined job

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        {job.icon && <FontAwesome name={job.icon} size={40} color="#007bff" />} {/* Display icon */} 
      </View>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.payment}>R {job.payment.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 3, // Shadow effect for elevation
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    width: '80%', // Width for two-column layout
  },
  iconContainer: {
    marginBottom: 8, // Space between icon and text
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Center text
  },
  payment: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center', // Center text
  },
});

export default JobCard;
