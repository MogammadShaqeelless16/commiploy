import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import supabase from '../supabaseClient';

const JobDetails = ({ route }) => {
  const { jobId } = route.params;
  const navigation = useNavigation();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleApply = () => {
    Alert.alert('Applied', `You have applied for the job: ${job.title}`);
  };

  const handleContactPoster = () => {
    // Navigate to the user or business profile details page
    navigation.navigate('UserProfileDetails', { userId: job.user_id }); // or job.business_id
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  if (!job) {
    return <Text>No job details found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.jobTitle}>{job.title}</Text>
      <Text style={styles.jobDescription}>{job.description}</Text>
      <Text style={styles.jobDetails}>Duration: {job.duration}</Text>
      <Text style={styles.jobDetails}>Address: {job.address}</Text>
      <Text style={styles.jobDetails}>Payment: R{job.payment.toFixed(2)}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Button title="Apply" onPress={handleApply} />
        <Button title="Contact Poster" onPress={handleContactPoster} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  jobDescription: {
    fontSize: 16,
    marginBottom: 12,
  },
  jobDetails: {
    fontSize: 16,
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default JobDetails;
