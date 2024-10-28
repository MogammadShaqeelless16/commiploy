import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const BusinessCards = () => {
  const navigation = useNavigation(); // Initialize navigation

  // Define category details: name and color
  const categories = [
    { name: 'Inventory', color: '#FF6347' },
    { name: 'Reports', color: '#4682B4' },
    { name: 'Business Profile', color: '#32CD32', navigateTo: 'BusinessList' }, // Add navigateTo property
  ];

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: category.color }]}
          onPress={() => {
            if (category.navigateTo) {
              navigation.navigate(category.navigateTo); // Navigate to BusinessList if present
            }
          }}
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
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    width: '30%',
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

export default BusinessCards;
