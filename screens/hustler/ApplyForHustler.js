import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Button, StyleSheet } from 'react-native';
import { fetchProfile } from '../../component/UserOperations/fetchProfile';
import UserProfile from './UserProfile';
import SkillsAndExperience from './SkillsAndExperience';
import DocumentUpload from './DocumentUpload';
import BankDetails from './BankDetails';
import ReviewApplication from './ReviewApplication';
import ProgressBar from './ProgressBar';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation

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
    // Navigate back to a previous screen or home
    Alert.alert(
      'Cancel Application',
      'Are you sure you want to cancel the application?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => navigation.goBack() } // Navigate back
      ]
    );
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
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressBar currentStep={currentStep} />
      {renderStep()}
      <View style={styles.buttonContainer}>
        {currentStep === 0 && ( // Show Cancel button only on the first step
          <Button title="Cancel" onPress={handleCancel} color="#FF6347" />
        )}
        {currentStep > 0 && (
          <Button title="Back" onPress={() => setCurrentStep(currentStep - 1)} />
        )}
        <Button title={currentStep < 4 ? "Next" : "Submit"} onPress={currentStep < 4 ? nextStep : handleSubmit} />
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

export default ApplyForHustler;
