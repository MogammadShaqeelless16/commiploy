import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { fetchProfile } from '../../component/UserOperations/fetchProfile';
import UserProfile from './UserProfile';
import SkillsAndExperience from './SkillsAndExperience';
import DocumentUpload from './DocumentUpload';
import BankDetails from './BankDetails';
import ReviewApplication from './ReviewApplication';
import ProgressBar from './ProgressBar';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation
import ArtBackground from '../../component/BackgroundSprites/ArtBackground';

const ApplyForHustler = () => {
  const navigation = useNavigation(); // Initialize the navigation hook
  const [userProfile, setUserProfile] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [documents, setDocuments] = useState({ resume: null, idProof: null, addressProof: null });
  const [bankDetails, setBankDetails] = useState('');
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility

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
      { condition: currentStep === 0 && !userProfile.first_name, message: 'Please fill in all fields.' },
      { condition: currentStep === 1 && !skills.length, message: 'Please enter your skills.' },
      { condition: currentStep === 2 && !documents.resume, message: 'Please upload your resume.' },
      { condition: currentStep === 3 && !hasBankAccount && !bankDetails, message: 'Please provide your bank details or apply for an account.' },
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
      setCurrentStep(prevStep => Math.min(prevStep + 1, 4));
    }
  };

  const handleSubmit = () => {
    if (hasBankAccount || bankDetails) {
      Alert.alert('Success', 'Application submitted successfully!');
    } else {
      Alert.alert('Error', 'You must either provide bank details or apply for a bank account.');
    }
  };

  const handleCancel = () => {
    // Directly navigate back without an alert
    navigation.goBack();
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
        return <UserProfile profile={userProfile} />;
      case 1:
        return (
          <SkillsAndExperience
            skills={skills}
            setSkills={setSkills}
            experience={experience}
            setExperience={setExperience}
            qualification={qualification}
            setQualification={setQualification}
          />
        );
      case 2:
        return <DocumentUpload documents={documents} setDocuments={setDocuments} />;
      case 3:
        return (
          <BankDetails
            bankDetails={bankDetails}
            setBankDetails={setBankDetails}
            hasBankAccount={hasBankAccount}
            setHasBankAccount={setHasBankAccount}
          />
        );
      case 4:
        return (
          <ReviewApplication
            profile={userProfile}
            skills={skills}
            experience={experience}
            qualification={qualification}
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
        <Button title={currentStep < 4 ? "Next" : "Submit"} onPress={currentStep < 4 ? nextStep : handleSubmit} />
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

export default ApplyForHustler;
