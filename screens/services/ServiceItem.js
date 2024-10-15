import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const ServiceItem = ({ service, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name="briefcase" size={24} color="#007bff" />
      </View>
      <Text style={styles.name}>{service.name}</Text>
      <Text style={styles.description}>{service.description}</Text>
      <View style={styles.priceContainer}>
        <Ionicons name="cash" size={16} color="#007bff" />
        <Text style={styles.price}>Price: R{service.price}</Text>
      </View>
      <View style={styles.callOutFeeContainer}>
        <Ionicons name="call" size={16} color="#ff5722" />
        <Text style={styles.callOutFee}>Call-Out Fee: R{service.call_out_fee}</Text>
      </View>
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
  iconContainer: {
    marginBottom: 8,
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    color: '#007bff',
    marginLeft: 4,
  },
  callOutFeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  callOutFee: {
    fontSize: 16,
    color: '#ff5722',
    marginLeft: 4,
  },
  date: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
});

export default ServiceItem;
