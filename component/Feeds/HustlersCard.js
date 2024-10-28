import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const HustlerCard = () => {
  const navigation = useNavigation(); // Initialize navigation
  // Define category details: name and color
  const categories = [
    { name: 'My Services', color: '#df0050' },
    { name: 'Jobs', color: '#029eb0' , navigateTo: 'JobList' },
    { name: 'Profits', color: '#32CD32' , navigateTo: 'Wallet'},
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
