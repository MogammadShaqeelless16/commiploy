import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute
import { fetchProfile } from '../../component/UserOperations/fetchProfile';
import supabase from '../../supabaseClient';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the route object
  const { totalAmount = 0 } = route.params || {}; // Destructure totalAmount with a default value
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const profile = await fetchProfile(); // Fetch user profile

        const { data: cartData, error } = await supabase
          .from('cart')
          .select('cart_id, product_id, quantity') // Adjust fields as necessary
          .eq('user_uuid', profile.id); // Assuming user_uuid matches profile.id

        if (error) {
          console.error('Error fetching cart items:', error.message);
          return;
        }

        // Assuming cartData contains products with their prices
        setCartItems(cartData);
      } catch (fetchError) {
        console.error('Error fetching cart:', fetchError.message);
      }
    };

    fetchCartItems();
  }, []);

  const handlePayment = async () => {
    // PayFast configuration
    const payfastUrl = 'https://sandbox.payfast.co.za/eng/process'; // Use the sandbox URL for testing
    const merchantId = 'YOUR_MERCHANT_ID'; // Your PayFast merchant ID
    const merchantKey = 'YOUR_MERCHANT_KEY'; // Your PayFast merchant key
    const returnUrl = 'https://yourwebsite.com/success'; // URL after payment success
    const cancelUrl = 'https://yourwebsite.com/cancel'; // URL if payment is cancelled
    const ipnUrl = 'https://yourwebsite.com/ipn'; // Your Instant Payment Notification URL

    // Prepare payment data
    const paymentData = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      amount: totalAmount.toFixed(2), // Use the passed totalAmount
      item_name: 'Order from Cart',
      return_url: returnUrl,
      cancel_url: cancelUrl,
      ipn_url: ipnUrl,
      email: 'customer@example.com', // Customer email
      // Add more data as necessary
    };

    // Convert data to query string
    const queryString = Object.keys(paymentData)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(paymentData[key]))
      .join('&');

    // Navigate to PayFast for payment processing
    navigation.navigate('WebViewScreen', { url: `${payfastUrl}?${queryString}` });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.totalText}>Total Amount: R{totalAmount.toFixed(2)}</Text>

      <View style={styles.paymentMethods}>
        <Text style={styles.paymentMethodsTitle}>Accepted Payment Methods</Text>
        <View style={styles.iconContainer}>
          <Image source={require('../../assets/images/payments.png')} style={styles.paymentIcon} />
        </View>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay with PayFast</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  totalText: {
    fontSize: 24,
    marginBottom: 20,
    color: '#555',
  },
  paymentMethods: {
    marginBottom: 20,
  },
  paymentMethodsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  paymentIcon: {
    width: 350,
    height:  300,
    resizeMode: 'contain',
  },
  payButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  backButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default CheckoutScreen;
