import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, StyleSheet, Modal, Text, TouchableOpacity, Alert } from 'react-native';
import { fetchProfile } from '../../component/UserOperations/fetchProfile';
import BusinessProfile from './BusinessProfile'; // New component for business details
import DocumentUpload from './DocumentUpload'; // For uploading business documents
import BankDetails from './BankDetails'; // For bank account information
import ReviewApplication from './ReviewApplication'; // To review all application data
import ProgressBar from './ProgressBar'; // Progress indicator
import { useNavigation } from '@react-navigation/native'; // Navigation hook
import ArtBackground from '../../component/BackgroundSprites/ArtBackground';

const ApplyForBusiness = () => {
  const navigation = useNavigation(); // Initialize navigation hook
  const [userProfile, setUserProfile] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [businessDetails, setBusinessDetails] = useState({}); // Business details state
  const [documents, setDocuments] = useState({ businessCert: null, taxID: null, operatingAgreement: null }); // Document uploads
  const [bankDetails, setBankDetails] = useState(''); // Bank details state
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await fetchProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    loadUserProfile();
  }, []);

  const validateCurrentStep = () => {
    const validations = [
      { condition: currentStep === 0 && !businessDetails.name, message: 'Please fill in the business name.' },
      { condition: currentStep === 0 && !businessDetails.address, message: 'Please fill in the business address.' },
      { condition: currentStep === 1 && !documents.businessCert, message: 'Please upload the business registration certificate.' },
      { condition: currentStep === 2 && !bankDetails, message: 'Please provide your bank details.' },
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

  const handleSubmit = () => {
    if (bankDetails) {
      Alert.alert('Success', 'Business application submitted successfully!');
    } else {
      Alert.alert('Error', 'You must provide bank details.');
    }
  };

  const handleCancel = () => {
    navigation.goBack(); // Directly navigate back
  };

  const openCancelModal = () => {
    setModalVisible(true);
  };

  const closeCancelModal = () => {
    setModalVisible(false);
  };

  const confirmCancel = () => {
    closeCancelModal();
    handleCancel(); // Navigate back
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BusinessProfile businessDetails={businessDetails} setBusinessDetails={setBusinessDetails} />;
      case 1:
        return <DocumentUpload documents={documents} setDocuments={setDocuments} />;
      case 2:
        return (
          <BankDetails
            bankDetails={bankDetails}
            setBankDetails={setBankDetails}
          />
        );
      case 3:
        return (
          <ReviewApplication
            businessDetails={businessDetails}
            documents={documents}
            bankDetails={bankDetails}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ArtBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <ProgressBar currentStep={currentStep} />
        {renderStep()}
        <View style={styles.buttonContainer}>
          {currentStep === 0 && ( // Show Cancel button only on the first step
            <Button title="Cancel" onPress={openCancelModal} color="#FF6347" />
          )}
          {currentStep > 0 && (
            <Button title="Back" onPress={() => setCurrentStep(currentStep - 1)} />
          )}
          <Button title={currentStep < 3 ? "Next" : "Submit"} onPress={currentStep < 3 ? nextStep : handleSubmit} />
        </View>

        {/* Modal for cancel confirmation */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={closeCancelModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to cancel the application?</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity onPress={confirmCancel} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeCancelModal} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ArtBackground>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ApplyForBusiness;
