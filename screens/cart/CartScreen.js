import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchProfile } from '../../component/UserOperations/fetchProfile';
import supabase from '../../supabaseClient';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import ArtBackground from '../../component/BackgroundSprites/ArtBackground';

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const profile = await fetchProfile(); // Fetch user profile

        const { data: cartData, error } = await supabase
          .from('cart')
          .select('cart_id, product_id, user_uuid, quantity') // Adjust fields as necessary
          .eq('user_uuid', profile.id); // Assuming user_uuid matches profile.id

        if (error) {
          console.error('Error fetching cart items:', error.message);
          return;
        }

        // Fetch product details (price, etc.) for each item in the cart
        const products = await Promise.all(
          cartData.map(async (item) => {
            const { data: productData, error: productError } = await supabase
              .from('products')
              .select('id, title, price') // Ensure these fields exist in your products table
              .eq('id', item.product_id)
              .single();

            if (productError) {
              console.error('Error fetching product details:', productError.message);
              return null; // Handle errors as needed
            }

            return { ...item, ...productData }; // Combine cart item and product data
          })
        );

        // Filter out null results
        const filteredProducts = products.filter(item => item !== null);
        setCartItems(filteredProducts);

        // Calculate total amount
        calculateTotalAmount(filteredProducts);
      } catch (fetchError) {
        console.error('Error fetching cart:', fetchError.message);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => {
      return acc + item.price * item.quantity; // Assuming each item has a price and quantity
    }, 0);
    setTotalAmount(total);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('cart_id', itemId);

      if (error) {
        console.error('Error removing item from cart:', error.message);
      } else {
        // Refresh cart items after removal
        setCartItems((prevItems) => prevItems.filter(item => item.cart_id !== itemId));
      }
    } catch (error) {
      console.error('Error in handleRemoveItem:', error.message);
    }
  };

  const handleUpdateQuantity = async (item, increment) => {
    const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;

    if (newQuantity < 1) {
      Alert.alert('Invalid Quantity', 'Quantity cannot be less than 1.');
      return;
    }

    try {
      const { error } = await supabase
        .from('cart')
        .update({ quantity: newQuantity })
        .eq('cart_id', item.cart_id);

      if (error) {
        console.error('Error updating item quantity:', error.message);
      } else {
        // Update local state
        const updatedItems = cartItems.map(cartItem =>
          cartItem.cart_id === item.cart_id ? { ...cartItem, quantity: newQuantity } : cartItem
        );
        setCartItems(updatedItems);
        calculateTotalAmount(updatedItems);
      }
    } catch (error) {
      console.error('Error in handleUpdateQuantity:', error.message);
    }
  };

  const renderCartItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.cartItem} 
      onPress={() => navigation.navigate('ProductDetails', { productId: item.product_id })} // Navigate to product details
    >
      <Text style={styles.productName}>{item.title}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleUpdateQuantity(item, false)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleUpdateQuantity(item, true)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.productPrice}>R{item.price.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => handleRemoveItem(item.cart_id)} style={styles.removeButton}>
        <Ionicons name="trash" size={24} color="#dc3545" /> {/* Trash icon */}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleBackPress = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleCheckoutPress = () => {
    // Navigate to the checkout screen
    navigation.navigate('CheckoutScreen'); // Adjust the screen name as necessary
  };

  return (
    <View style={styles.container}>
      <ArtBackground>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#007bff" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Your Cart</Text>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.cart_id.toString()} // Changed to cart_id for keyExtractor
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: R{totalAmount.toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckoutPress}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </ArtBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  productName: {
    fontSize: 18,
  },
  productPrice: {
    fontSize: 16,
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  removeButton: {
    padding: 5,
  },
  totalContainer: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space between total text and checkout button
    marginTop: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center', // Center items vertically
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 8,
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
