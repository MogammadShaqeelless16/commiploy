import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Image } from 'react-native';

const Image1 = require('../assets/images/hustler.jpeg');

const BecomeAHustler = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Become a Hustler</Text>
      <Text style={styles.subtitle}>
        Apply for freelance opportunities for odd jobs!
      </Text>

      <Image source={Image1} style={styles.Image1} />

      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Dont have an account apply with fnb</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply now. </Text>
      </TouchableOpacity>

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
  Image1: {
    width: '30vh',
    height: '28vh'
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
