import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HustlerCard = () => {
  // Define category details: name and color
  const categories = [
    { name: 'My Services', color: '#df0050' },
    { name: 'Jobs', color: '#029eb0' },
    { name: 'Profits', color: '#32CD32' },
  ];

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: category.color }]}
        >
          <Text style={styles.cardText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Changed to 'space-between' to have even spacing
    padding: 10,
  },
  card: {
    width: '30%', // Set width to 30% for 3 columns
    height: 120,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HustlerCard;
