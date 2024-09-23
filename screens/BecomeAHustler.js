import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BecomeAHustler = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Become a Hustler</Text>
      <Text style={styles.subtitle}>
        Apply for freelance opportunities for odd jobs!
      </Text>

      <Text style={styles.sectionTitle}>What You Need:</Text>
      <Text style={styles.bulletPoint}>• A valid South African ID or Passport.</Text>
      <Text style={styles.bulletPoint}>• Skills and experience in various services.</Text>
      <Text style={styles.bulletPoint}>• Own tools and equipment.</Text>
      <Text style={styles.bulletPoint}>• Proof of Bank Details.</Text>

      <Text style={styles.sectionTitle}>Benefits of Working as a Hustler:</Text>
      <Text style={styles.bulletPoint}>• Flexible working hours.</Text>
      <Text style={styles.bulletPoint}>• Variety of jobs to choose from.</Text>
      <Text style={styles.bulletPoint}>• Opportunity to earn extra income.</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#007BFF',
  },
  bulletPoint: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BecomeAHustler;
