import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, StyleSheet, Alert, Modal, Text, TouchableOpacity } from 'react-native';
import ProductDetails from './ProductDetails';
import ProductLocation from './ProductLocation';
import ProductImages from './ProductImages';
import ProductReview from './ProductReview';
import ProgressBar from './ProgressBar';
import supabase from '../../supabaseClient';

const PostProduct = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [productLocation, setProductLocation] = useState({
    address: '',
  });
  const [productImages, setProductImages] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);  // State to handle modal visibility

  const fakeGenerateProductDescription = () => {
    const fakeDescriptions = [
      'This product is of the highest quality, designed to meet your needs.',
      'A premium item that will enhance your lifestyle with top-notch features.',
      'Experience the best of innovation and functionality with this product.',
      'This product offers exceptional performance at an affordable price.',
      'Crafted with precision and durability, this product is made to last.'
    ];
    const randomIndex = Math.floor(Math.random() * fakeDescriptions.length);
    return fakeDescriptions[randomIndex];
  };

  const validateCurrentStep = () => {
    const validations = [
      { condition: currentStep === 0 && productImages.length === 0, message: 'Please upload at least one image.' },
      { condition: currentStep === 1 && (!productDetails.name || !productDetails.description || !productDetails.price), message: 'Please fill in all product details.' },
      { condition: currentStep === 2 && !productLocation.address, message: 'Please provide a location.' },
    ];

    const error = validations.find(validation => validation.condition);
    if (error) {
      Alert.alert('Error', error.message);
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prevStep => Math.min(prevStep + 1, 3));
    }
  };

  // Handle image upload and description generation
  useEffect(() => {
    if (productImages.length > 0 && !productDetails.description) {
      // Simulate generating description after image upload
      const generatedDescription = fakeGenerateProductDescription();
      setProductDetails(prevState => ({
        ...prevState,
        description: generatedDescription,
      }));
    }
  }, [productImages]);

  // Function to handle the cancellation action
  const cancelPosting = () => {
    setShowCancelModal(true); // Show the cancel confirmation modal
  };

  // Function to confirm cancel action
  const confirmCancel = () => {
    setShowCancelModal(false); // Close the modal
    navigation.goBack(); // Navigate back to the previous screen
  };

  // Function to cancel the modal and stay on the current page
  const closeModal = () => {
    setShowCancelModal(false); // Close the modal without cancelling
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: productDetails.name,
          description: productDetails.description,
          price: parseFloat(productDetails.price),
          address: productLocation.address,
          images: productImages,
        }]);

      if (error) throw error;

      Alert.alert('Success', 'Product posted successfully!');
    } catch (error) {
      Alert.alert('Error', 'There was an error posting your product: ' + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressBar currentStep={currentStep} />
      {currentStep === 0 && <ProductImages productImages={productImages} setProductImages={setProductImages} />}
      {currentStep === 1 && <ProductDetails productDetails={productDetails} setProductDetails={setProductDetails} />}
      {currentStep === 2 && <ProductLocation productLocation={productLocation} setProductLocation={setProductLocation} />}
      {currentStep === 3 && <ProductReview productDetails={productDetails} productLocation={productLocation} productImages={productImages} handleSubmit={handleSubmit} />}

      <View style={styles.buttonContainer}>
        {currentStep > 0 && <Button title="Back" onPress={() => setCurrentStep(currentStep - 1)} />}
        {currentStep < 3 ? <Button title="Next" onPress={nextStep} /> : <Button title="Submit" onPress={handleSubmit} />}
        
        {/* Cancel Button visible only on the first step */}
        {currentStep === 0 && <Button title="Cancel" onPress={cancelPosting} color="red" />}
      </View>

      {/* Modal for cancel confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCancelModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Are you sure you want to cancel?</Text>
            <Text style={styles.modalMessage}>All your progress will be lost.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={confirmCancel}>
                <Text style={styles.modalButtonText}>Yes, Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>No, Stay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PostProduct;
