import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { fetchProfile } from '../../component/UserOperations/fetchProfile';
import supabase from '../../supabaseClient';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { totalAmount = 0 } = route.params || {};
  const [cartItems, setCartItems] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const profile = await fetchProfile(); 

        const { data: cartData, error } = await supabase
          .from('cart')
          .select('cart_id, product_id, quantity')
          .eq('user_uuid', profile.id);

        if (error) {
          console.error('Error fetching cart items:', error.message);
          return;
        }
        setCartItems(cartData);
      } catch (fetchError) {
        console.error('Error fetching cart:', fetchError.message);
      }
    };

    fetchCartItems();
  }, []);

  const handlePayment = () => {
    setModalVisible(true); // Show modal with the demo message
  };

  const closeModal = () => {
    setModalVisible(false);
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

      {/* Modal for Demo Message */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thank You for Trying Our App!</Text>
            <Text style={styles.modalMessage}>
              We can't process orders at this time as this is a demo System.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    height: 300,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CheckoutScreen;
