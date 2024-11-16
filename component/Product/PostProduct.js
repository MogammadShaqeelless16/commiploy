import React, { useState } from 'react';
import { View, ScrollView, Button, StyleSheet, Alert } from 'react-native';
import ProductDetails from './ProductDetails';
import ProductLocation from './ProductLocation';
import ProductImages from './ProductImages';
import ProductReview from './ProductReview';
import ProgressBar from './ProgressBar';
import supabase from '../../supabaseClient';

const PostProduct = () => {
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

  const validateCurrentStep = () => {
    const validations = [
      { condition: currentStep === 0 && (!productDetails.name || !productDetails.description || !productDetails.price), message: 'Please fill in all product details.' },
      { condition: currentStep === 1 && !productLocation.address, message: 'Please provide a location.' },
      { condition: currentStep === 2 && productImages.length === 0, message: 'Please upload at least one image.' },
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

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name: productDetails.name,
            description: productDetails.description,
            price: parseFloat(productDetails.price),
            address: productLocation.address,
            images: productImages,
          },
        ]);

      if (error) throw error;

      Alert.alert('Success', 'Product posted successfully!');
    } catch (error) {
      Alert.alert('Error', 'There was an error posting your product: ' + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressBar currentStep={currentStep} />
      {currentStep === 0 && <ProductDetails productDetails={productDetails} setProductDetails={setProductDetails} />}
      {currentStep === 1 && <ProductLocation productLocation={productLocation} setProductLocation={setProductLocation} />}
      {currentStep === 2 && <ProductImages productImages={productImages} setProductImages={setProductImages} />}
      {currentStep === 3 && <ProductReview productDetails={productDetails} productLocation={productLocation} productImages={productImages} handleSubmit={handleSubmit} />}
      <View style={styles.buttonContainer}>
        {currentStep > 0 && <Button title="Back" onPress={() => setCurrentStep(currentStep - 1)} />}
        {currentStep < 3 ? <Button title="Next" onPress={nextStep} /> : <Button title="Submit" onPress={handleSubmit} />}
      </View>
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
});

export default PostProduct;
