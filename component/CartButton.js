import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons
import { fetchProfile } from './UserOperations/fetchProfile'; // Make sure the path is correct
import supabase from '../supabaseClient';

const CartButton = () => {
  const navigation = useNavigation();
  const [cartCount, setCartCount] = useState(0); // State to hold cart count

  const handleGoToCart = () => {
    navigation.navigate('CartScreen'); // Navigate to your Shopping Cart screen
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const profile = await fetchProfile();  // Fetch the user profile
        console.log('Fetched Profile:', profile); // Log the fetched profile

        const { data: cartData, error } = await supabase
          .from('cart')
          .select('cart_id')
          .eq('user_uuid', profile.id); // Assuming user_uuid matches profile.id

        if (error) {
          console.error('Error fetching cart count:', error.message);
          return;
        }

        console.log('Fetched Cart Data:', cartData); // Log the fetched cart data
        setCartCount(cartData.length); // Update the cart count
      } catch (fetchError) {
        console.error('Error fetching cart:', fetchError.message);
      }
    };

    fetchCartCount();

    const intervalId = setInterval(fetchCartCount, 60000); // Fetch every 60 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []); // Empty dependency array to run only on mount

  return (
    <TouchableOpacity style={styles.container} onPress={handleGoToCart}>
      <View style={styles.iconContainer}>
        <Icon name="cart" size={30} color="#333" /> {/* Cart Icon */}
        {cartCount > 0 && ( // Conditional rendering for cart count
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  iconContainer: {
    position: 'relative', // Set position to relative to position badge correctly
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CartButton;
