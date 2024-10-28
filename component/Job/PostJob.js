import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, StyleSheet, Alert, Text, Modal, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ArtBackground from '../../component/BackgroundSprites/ArtBackground';
import ProgressBar from './ProgressBar';
import JobDetails from './JobDetails';
import JobLocation from './JobLocation';
import JobImages from './JobImages';
import JobReview from './JobReview';
import supabase from '../../supabaseClient';

const PostJob = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { postText } = route.params || {};

  const [currentStep, setCurrentStep] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: postText || '',
    payment: '',
  });

  const [jobLocation, setJobLocation] = useState({
    address: '',
    duration: '',
    latitude: null,
    longitude: null,
  });

  const [jobImages, setJobImages] = useState([]);

  const validateCurrentStep = () => {
    const validations = [
      { condition: currentStep === 0 && (!jobDetails.title || !jobDetails.description || !jobDetails.payment), message: 'Please fill in all job details.' },
      { condition: currentStep === 1 && (!jobLocation.address || !jobLocation.duration), message: 'Please fill in location and duration.' },
      { condition: currentStep === 2 && jobImages.length === 0, message: 'Please upload at least one image.' },
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
        .from('jobs')
        .insert([
          {
            title: jobDetails.title,
            description: jobDetails.description,
            duration: jobLocation.duration,
            address: jobLocation.address,
            payment: parseFloat(jobDetails.payment),
            latitude: jobLocation.latitude,
            longitude: jobLocation.longitude,
            user_id: 'user_id_placeholder',
          },
        ]);

      if (error) throw error;

      Alert.alert('Success', 'Job posted successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'There was an error posting your job: ' + error.message);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <JobDetails jobDetails={jobDetails} setJobDetails={setJobDetails} />;
      case 1:
        return <JobLocation jobLocation={jobLocation} setJobLocation={setJobLocation} />;
      case 2:
        return <JobImages jobImages={jobImages} setJobImages={setJobImages} />;
      case 3:
        return (
          <JobReview
            jobDetails={jobDetails}
            jobLocation={jobLocation}
            jobImages={jobImages}
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
          {currentStep > 0 && (
            <Button title="Back" onPress={() => setCurrentStep(currentStep - 1)} />
          )}
          {currentStep < 3 ? (
            <Button title="Next" onPress={nextStep} />
          ) : (
            <Button title="Submit" onPress={handleSubmit} />
          )}
          <Button title="Cancel" color="#FF5C5C" onPress={() => setShowCancelModal(true)} />
        </View>

        {/* Cancel Confirmation Modal */}
        <Modal
          transparent={true}
          visible={showCancelModal}
          animationType="slide"
          onRequestClose={() => setShowCancelModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Cancel Post</Text>
              <Text style={styles.modalText}>Are you sure you want to cancel your post?</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowCancelModal(false)}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={() => {
                    setShowCancelModal(false);
                    navigation.goBack();
                  }}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: '#FF5C5C',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PostJob;
