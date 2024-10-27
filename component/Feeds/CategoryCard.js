import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CategoryCard = ({ navigation }) => {
  // Define category details: name and color
  const categories = [
    { name: 'Electronics', color: '#FF6347' },
    { name: 'Home Appliances', color: '#4682B4' },
    { name: 'Food & Takeaways', color: '#32CD32' },
    { name: 'Clothes & Accessories', color: '#FFD700' },
    { name: 'Hardware', color: '#f6bc1d' },
    { name: 'Groceries', color: '#f6bc1d' },
  ];

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: category.color }]}
          onPress={() => navigation.navigate('ProductsList', { category: category.name })} // Navigate with selected category
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

export default CategoryCard;
