import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

// Define category details: name and image
const categories = [
  { name: 'Electronics', image: require('../../assets/category-icons/Electronics.png') },
  { name: 'Groceries', image: require('../../assets/category-icons/Groceries.png') },
  { name: 'Food', image: require('../../assets/category-icons/Food_and_takeaways.png') },
  { name: 'Clothes', image: require('../../assets/category-icons/Clothes_and_accessories.png') },
  { name: 'Hardware', image: require('../../assets/category-icons/Hardware.png') },
  { name: 'Home Appliances', image: require('../../assets/category-icons/Home_Appliances.png') },
];

const CategoryCard = ({ navigation }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if the screen width is more than 800 pixels for desktop
    const updateLayout = () => setIsDesktop(Dimensions.get('window').width > 800);
    updateLayout();
    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  }, []);

  return (
    <View style={[styles.container, isDesktop && styles.desktopContainer]}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, isDesktop && styles.desktopCard]}
          onPress={() => navigation.navigate('ProductsList', { category: category.name })}
        >
          <Image
            source={category.image}
            style={styles.image}
            resizeMode="contain"
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
    paddingHorizontal: 10,
  },
  desktopContainer: {
    flexWrap: 'nowrap', // Prevent wrapping for desktop view
    justifyContent: 'space-around', // Spread items evenly on desktop
  },
  card: {
    width: '30%', // Width for mobile view
    height: 120,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  desktopCard: {
    width: '15%', // Reduced width to fit all items in one row on desktop
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CategoryCard;
