import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import supabase from '../supabaseClient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AlertModal from '../component/AlertModal';

const JobDetails = ({ route }) => {
  const { jobId } = route.params;
  const navigation = useNavigation();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) {
        throw new Error('Error fetching job details');
      }

      setJob(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const handleApply = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      // Show alert if user is not signed in
      setModalVisible(true);
    } else {
      // Navigate to the Apply screen if the user is signed in
      navigation.navigate('Apply', { jobId: job.id }); // Pass job ID to Apply screen
    }
  };

  const handleContactPoster = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      // Show alert if user is not signed in
      setModalVisible(true);
    } else {
      // Navigate to UserProfileDetails if the user is signed in
      navigation.navigate('UserProfileDetails', { userId: job.user_id });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />;
  }

  if (!job) {
    return <Text style={styles.errorText}>No job details found.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.jobTitle}>{job.title}</Text>
      <Text style={styles.jobDescription}>{job.description}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.jobDetails}>Duration: {job.duration}</Text>
        <Text style={styles.jobDetails}>Address: {job.address}</Text>
        <Text style={styles.jobDetails}>Payment: R{job.payment.toFixed(2)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleApply}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleContactPoster}>
          <Ionicons name="mail" size={20} color="#fff" />
          <Text style={styles.buttonText}>Contact Poster</Text>
        </TouchableOpacity>
      </View>

      {/* Alert Modal */}
      <AlertModal 
        visible={modalVisible} 
        message="You need to have an account to access this feature. Please log in or sign up."
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  jobDescription: {
    fontSize: 16,
    marginBottom: 12,
    color: '#555',
  },
  detailsContainer: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    padding: 12,
    marginVertical: 16,
  },
  jobDetails: {
    fontSize: 16,
    marginTop: 4,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default JobDetails;
