import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Image, Modal } from 'react-native';
import supabase from '../supabaseClient'; // Ensure this path is correct
import { Ionicons } from '@expo/vector-icons';
import Loading from '../component/loadingComponent/loading';
import { fetchProfile } from '../component/UserOperations/fetchProfile';

const ProductDetails = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false); // State for overlay visibility
  const [similarProducts, setSimilarProducts] = useState([]); // State for similar products
  const [isInCart, setIsInCart] = useState(false); // State to check if the product is in the cart

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, shop_id:businesses(*)')
        .eq('id', productId)
        .single();

      if (error) {
        throw new Error('Error fetching product details');
      }

      setProduct(data);
      fetchSimilarProducts(data.category_id); // Fetch similar products
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const profile = await fetchProfile();
      setUserId(profile.id);
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }
  };

  const fetchSimilarProducts = async (categoryId) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryId)
        .neq('id', productId) // Exclude the current product
        .limit(4); // Limit to 4 similar products

      if (error) {
        throw new Error('Error fetching similar products');
      }

      setSimilarProducts(data);
    } catch (error) {
      console.error('Error fetching similar products:', error.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchProductDetails();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleBuyPress = async () => {
    if (!userId) {
      Alert.alert('Error', 'User not logged in. Please log in to continue.');
      return;
    }

    // Check if the product is already in the cart
    const { data: existingCartItems, error } = await supabase
      .from('cart')
      .select('*')
      .eq('product_id', product.id)
      .eq('user_uuid', userId);

    if (error) {
      console.error('Error checking cart:', error.message);
      return;
    }

    if (existingCartItems.length > 0) {
      setIsInCart(true); // Product is already in the cart
      return; // Exit the function
    }

    try {
      const { error: insertError } = await supabase
        .from('cart')
        .insert([
          {
            product_id: product.id,
            user_uuid: userId,
            quantity: 1,
          },
        ]);

      if (insertError) {
        throw new Error('Error adding product to cart');
      }

      setIsInCart(true);
      setOverlayVisible(true); // Show overlay message
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <Text style={styles.errorText}>No product details found.</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#007bff" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Image 
        source={{ uri: product.image_url }} 
        style={styles.productImage} 
        resizeMode="contain" 
      />

      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productPrice}>Price: R{product.price.toFixed(2)}</Text>
      <Text style={styles.productRating}>Rating: {product.rating ? product.rating.toFixed(1) : 'Not rated yet'}</Text>

      <View style={styles.shopContainer}>
        <Text style={styles.shopTitle}>Sold by: {product.shop_id.name}</Text>
        <Text style={styles.shopDetails}>Address: {product.shop_id.address}</Text>
        <Text style={styles.shopDetails}>Contact: {product.shop_id.contact_number}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.button, isInCart ? styles.disabledButton : null]} 
        onPress={handleBuyPress} 
        disabled={isInCart} // Disable button if item is already in cart
      >
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>
      {isInCart && <Text style={styles.cartMessage}>You already have this item in your cart. Complete your order.</Text>}

      {/* Overlay for product added to cart */}
      <Modal
        transparent={true}
        visible={overlayVisible}
        animationType="fade"
      >
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Product added to cart!</Text>
          <TouchableOpacity onPress={closeOverlay} style={styles.overlayButton}>
            <Text style={styles.overlayButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Similar Products Section */}
      <View style={styles.similarProductsContainer}>
        <Text style={styles.similarProductsTitle}>Similar Products</Text>
        {similarProducts.map((item) => (
          <View key={item.id} style={styles.similarProductItem}>
            <Image 
              source={{ uri: item.image_url }} 
              style={styles.similarProductImage} 
            />
            <Text style={styles.similarProductName}>{item.name}</Text>
            <Text style={styles.similarProductPrice}>Price: R{item.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
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
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  productRating: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  shopContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  shopTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  shopDetails: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc', // Grey out the button
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cartMessage: {
    color: '#dc3545',
    marginTop: 10,
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayText: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 20,
  },
  overlayButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  overlayButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  similarProductsContainer: {
    marginTop: 20,
  },
  similarProductsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  similarProductItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  similarProductImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  similarProductName: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  similarProductPrice: {
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default ProductDetails;
