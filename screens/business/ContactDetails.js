import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const ContactDetails = ({ contactDetails, setContactDetails }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Contact Name:</Text>
      <TextInput
        style={styles.input}
        value={contactDetails.name}
        onChangeText={(text) => setContactDetails({ ...contactDetails, name: text })}
        placeholder="Enter contact name"
      />
      <Text style={styles.label}>Contact Email:</Text>
      <TextInput
        style={styles.input}
        value={contactDetails.email}
        onChangeText={(text) => setContactDetails({ ...contactDetails, email: text })}
        placeholder="Enter contact email"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Contact Phone:</Text>
      <TextInput
        style={styles.input}
        value={contactDetails.phone}
        onChangeText={(text) => setContactDetails({ ...contactDetails, phone: text })}
        placeholder="Enter contact phone number"
        keyboardType="phone-pad"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default ContactDetails;
