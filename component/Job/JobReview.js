// JobReview.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const JobReview = ({ jobDetails, jobLocation, jobImages, handleSubmit }) => {
  return (
    <View>
      <Text style={styles.label}>Review Your Job Posting</Text>
      <Text style={styles.details}>Title: {jobDetails.title}</Text>
      <Text style={styles.details}>Description: {jobDetails.description}</Text>
      <Text style={styles.details}>Payment: ${jobDetails.payment}</Text>
      <Text style={styles.details}>Location: {jobLocation.address}</Text>
      <Text style={styles.details}>Duration: {jobLocation.duration}</Text>
      <Text style={styles.label}>Images:</Text>
      {jobImages.map((uri, index) => (
        <Text key={index} style={styles.imageText}>{uri}</Text>
      ))}
      <Button title="Submit Job" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    marginBottom: 3,
  },
  imageText: {
    color: '#555',
  },
});

export default JobReview;
