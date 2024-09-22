import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JobDetails = ({ route }) => {
  const { job } = route.params; // Assume job object is passed in params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.details}>Description: {job.description}</Text>
      <Text style={styles.details}>Duration: {job.duration}</Text>
      <Text style={styles.details}>Location: {job.address}</Text>
      <Text style={styles.details}>Payment: ${job.payment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 18,
    marginVertical: 4,
  },
});

export default JobDetails;
