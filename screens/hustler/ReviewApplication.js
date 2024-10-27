import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ReviewApplication = ({ profile, skills, experience, qualification, documents, bankDetails, handleSubmit }) => {
  if (!profile) return null;
  const { first_name = '' } = profile;

  return (
    <View>
      <Text style={styles.header}>Review Your Application</Text>
      <Text style={styles.label}>Name: {first_name}</Text>
      <Text style={styles.label}>Skills: {skills.join(', ')}</Text>
      <Text style={styles.label}>Experience: {experience}</Text>
      <Text style={styles.label}>Qualification: {qualification}</Text>
      {['resume', 'idProof', 'addressProof'].map((docType) => (
        documents[docType] && <Text key={docType} style={styles.label}>Uploaded {docType.charAt(0).toUpperCase() + docType.slice(1)}: {documents[docType].name}</Text>
      ))}
      <Text style={styles.label}>Bank Details: {bankDetails || 'Not provided'}</Text>
      <Button title="Submit Application" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ReviewApplication;
