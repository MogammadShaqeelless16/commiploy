import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';

const ServiceProviderCard = ({ service, navigation, numColumns = 2 }) => {
  const { width } = useWindowDimensions(); // Get screen width dynamically

  // Calculate card width based on numColumns
  const cardWidth = (width - 32 - (numColumns - 1) * 12) / numColumns;

  const handlePress = () => {
    navigation.navigate('ServiceDetails', { serviceId: service.id });
  };

  return (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]} onPress={handlePress}>
      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.price}>Price: R {service.price}</Text>
      <Text style={styles.callOutFee}>Call-out Fee: R {service.call_out_fee}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    marginRight: 12,
    aspectRatio: 1, // Keeps card square
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  callOutFee: {
    fontSize: 14,
    color: '#666',
  },
});

export default ServiceProviderCard;
