import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, StyleSheet, Modal, Text, TouchableOpacity, Alert } from 'react-native';
import { fetchProfile } from '../../component/UserOperations/fetchProfile';
import BusinessProfile from './BusinessProfile'; // Component for business profile details
import DocumentUpload from './DocumentUpload'; // Component for uploading business documents
import BankDetails from './BankDetails'; // Component for bank account information
import ReviewApplication from './ReviewApplication'; // Component to review all application data
import ProgressBar from './ProgressBar'; // Progress indicator
import { useNavigation } from '@react-navigation/native'; // Navigation hook
import ArtBackground from '../../component/BackgroundSprites/ArtBackground';
import ContactDetails from './ContactDetails'; // New component for contact details
import Sectors from './Sectors'; // New component for business sectors

const ApplyForBusiness = () => {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [businessProfile, setBusinessProfile] = useState({
    businessName: '',
    address: '',
  }); // Business profile state
  const [documents, setDocuments] = useState({
    businessCert: null,
    taxID: null,
    operatingAgreement: null,
  }); // Document uploads
  const [bankDetails, setBankDetails] = useState('');
  const [contactDetails, setContactDetails] = useState({
    name: '',
    email: '',
    phone: '',
  }); // Contact details state
  const [sectors, setSectors] = useState([]); // Selected sectors
  const [plan, setPlan] = useState(null); // Selected plan
  const [modalVisible, setModalVisible] = useState(false);

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

  // Validation function for the current step
  const validateCurrentStep = () => {
    const validations = [
      // Business Profile Step
      { condition: currentStep === 0 && !businessProfile.businessName, message: 'Please fill in the business name.' },
      { condition: currentStep === 0 && !businessProfile.address, message: 'Please fill in the business address.' },

      // Contact Details Step
      { condition: currentStep === 1 && !contactDetails.name, message: 'Please fill in the contact name.' },
      { condition: currentStep === 1 && !contactDetails.email, message: 'Please fill in the contact email.' },
      { condition: currentStep === 1 && !contactDetails.phone, message: 'Please fill in the contact phone number.' },

      // Sectors Step
      { condition: currentStep === 2 && sectors.length === 0, message: 'Please select at least one sector.' },
      { condition: currentStep === 2 && !plan, message: 'Please select a plan.' },

      // Bank Details Step
      { condition: currentStep === 3 && !bankDetails, message: 'Please provide your bank details.' },

      // Document Upload Step
      { condition: currentStep === 4 && !documents.businessCert, message: 'Please upload the business registration certificate.' },
      { condition: currentStep === 4 && !documents.taxID, message: 'Please upload the tax ID document.' },
      { condition: currentStep === 4 && !documents.operatingAgreement, message: 'Please upload the operating agreement.' },
    ];

    const error = validations.find(validation => validation.condition);
    if (error) {
      Alert.alert('Error', error.message);
      return false;
    }
    return true;
  };

  // Function to proceed to the next step
  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prevStep => Math.min(prevStep + 1, 5));
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (bankDetails) {
      Alert.alert('Success', 'Business application submitted successfully!');
      navigation.goBack(); // Optionally navigate back after submission
    } else {
      Alert.alert('Error', 'You must provide bank details.');
    }
  };

  // Handle navigation cancellation
  const handleCancel = () => {
    navigation.goBack(); // Directly navigate back
  };

  // Modal management functions
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

  // Render the current step of the application
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BusinessProfile 
            businessProfile={businessProfile} 
            setBusinessProfile={setBusinessProfile} 
          />
        );
      case 1:
        return (
          <ContactDetails
            contactDetails={contactDetails}
            setContactDetails={setContactDetails}
          />
        );
      case 2:
        return (
          <Sectors
            sectors={sectors}
            setSectors={setSectors}
            plan={plan}
            setPlan={setPlan}
          />
        );
      case 3:
        return (
          <BankDetails 
            bankDetails={bankDetails} 
            setBankDetails={setBankDetails} 
          />
        );
      case 4:
        return (
          <DocumentUpload 
            documents={documents} 
            setDocuments={setDocuments} 
          />
        );
      case 5:
        return (
          <ReviewApplication
            businessDetails={businessProfile}
            documents={documents}
            bankDetails={bankDetails}
            contactDetails={contactDetails}
            sectors={sectors}
            plan={plan}
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
          <Button 
            title={currentStep < 5 ? "Next" : "Submit"} 
            onPress={currentStep < 5 ? nextStep : handleSubmit} 
          />
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
