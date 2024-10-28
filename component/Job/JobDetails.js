// JobDetails.js
import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const JobDetails = ({ jobDetails, setJobDetails }) => {
  return (
    <View>
      <Text style={styles.label}>Job Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter job title"
        value={jobDetails.title}
        onChangeText={(text) => setJobDetails({ ...jobDetails, title: text })}
      />
      <Text style={styles.label}>Job Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter job description"
        value={jobDetails.description}
        onChangeText={(text) => setJobDetails({ ...jobDetails, description: text })}
        multiline
      />
      <Text style={styles.label}>Payment</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter payment amount"
        value={jobDetails.payment}
        onChangeText={(text) => setJobDetails({ ...jobDetails, payment: text })}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default JobDetails;
