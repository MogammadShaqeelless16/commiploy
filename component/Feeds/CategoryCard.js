import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Define category details: name and image
const categories = [
  { name: 'Electronics', image: require('../../assets/category-icons/Electronics.png') }, // Update path to your images
  { name: 'Groceries', image: require('../../assets/category-icons/Groceries.png') },
  { name: 'Food & Takeaways', image: require('../../assets/category-icons/Food_and_takeaways.png') },
  { name: 'Clothes & Accessories', image: require('../../assets/category-icons/Clothes_and_accessories.png') },
  { name: 'Hardware', image: require('../../assets/category-icons/Hardware.png') },
  { name: 'Home Appliances', image: require('../../assets/category-icons/Home_Appliances.png') },
];

const CategoryCard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => navigation.navigate('ProductsList', { category: category.name })} // Navigate with selected category
        >
          <Image
            source={category.image}
            style={styles.image}
            resizeMode="contain" // Adjust how the image fits
          />
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
  },
  card: {
    width: '30%', // Adjust width as needed
    height: 120, // Set a height for the card
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden', // To prevent image overflow
  },
  image: {
    width: '100%', // Set width to 100% of the card
    height: '100%', // Set height to 100% of the card
  },
});

export default CategoryCard;
