import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons

const JobCard = ({ job, navigation }) => {
  if (!job) return null; // Handle undefined job

  // Render the icon based on the job icon name from the database
  const renderIcon = () => {
    if (job.icon) {
      return <MaterialIcons name={job.icon} size={40} color="#60b135" />;
    }
    return <MaterialIcons name="work" size={40} color="#60b135" />; // Default icon
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('JobDetails', { jobId: job.id })} // Navigate to JobDetails with jobId
    >
      <View style={styles.iconContainer}>
        {renderIcon()} {/* Display the appropriate icon */} 
      </View>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.payment}>R {job.payment.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    padding: 10,
    alignItems: 'center', // Center items horizontally
  },
  iconContainer: {
    marginBottom: 8, // Space between icon and text
    alignItems: 'center', // Center the icon
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
