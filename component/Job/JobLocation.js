// JobLocation.js
import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const JobLocation = ({ jobLocation, setJobLocation }) => {
  return (
    <View>
      <Text style={styles.label}>Job Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter job location"
        value={jobLocation.address}
        onChangeText={(text) => setJobLocation({ ...jobLocation, address: text })}
      />
      <Text style={styles.label}>Duration</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter duration (e.g., 1 month)"
        value={jobLocation.duration}
        onChangeText={(text) => setJobLocation({ ...jobLocation, duration: text })}
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

export default JobLocation;
