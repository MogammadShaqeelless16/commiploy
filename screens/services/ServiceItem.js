import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ServiceItem = ({ service, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.name}>{service.name}</Text>
      <Text style={styles.description}>{service.description}</Text>
      <Text style={styles.price}>Price: R{service.price.toFixed(2)}</Text>
      <Text style={styles.callOutFee}>Call-Out Fee: R{service.call_out_fee.toFixed(2)}</Text>
      <Text style={styles.date}>Created At: {new Date(service.created_at).toLocaleDateString()}</Text>
      <Text style={styles.date}>Updated At: {new Date(service.updated_at).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    margin: 8,
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 4,
  },
  callOutFee: {
    fontSize: 16,
    color: '#ff5722',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
});

export default ServiceItem;
