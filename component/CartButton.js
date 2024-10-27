import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons

const CartButton = () => {
  const navigation = useNavigation();

  const handleGoToCart = () => {
    navigation.navigate('ShoppingCart'); // Navigate to your Shopping Cart screen
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleGoToCart}>
      <Icon name="cart" size={30} color="#333" /> {/* Cart Icon */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});

export default CartButton;
