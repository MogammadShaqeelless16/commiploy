import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import supabase from '../supabaseClient';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../component/loadingComponent/loading';

const ApplicationDetails = () => {
  const [application, setApplication] = useState(null);
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  
  const { applicationId } = route.params;

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const { data: appData, error: appError } = await supabase
          .from('applications')
          .select(`
            id, applicant_name, applicant_email, applicant_phone_number, 
            cover_letter, application_status, submitted_at, job_id
          `)
          .eq('id', applicationId)
          .single();

        if (appError) throw appError;
        if (!appData) throw new Error('Application not found.');

        setApplication(appData);

        // Fetch job details
        const { data: jobData, error: jobError } = await supabase
          .from('jobs')
          .select('id, title')
          .eq('id', appData.job_id)
          .single();

        if (jobError) throw jobError;
        setJob(jobData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchApplicationDetails();
  }, [applicationId]);

  if (error) {
    return <View style={styles.container}><Text style={styles.errorText}>Error: {error}</Text></View>;
  }

  if (!application || !job) {
    return <Loading />;
  }

  const data = [
    { label: 'Job Title', value: job.title },
    { label: 'Applicant Name', value: application.applicant_name },
    { label: 'Email', value: application.applicant_email },
    { label: 'Phone', value: application.applicant_phone_number },
    { label: 'Cover Letter', value: application.cover_letter },
    { label: 'Status', value: application.application_status },
    { label: 'Submitted At', value: new Date(application.submitted_at).toLocaleDateString() },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.infoRow}>
      <Icon name="information-circle-outline" size={24} color="#4a90e2" />
      <View style={styles.infoTextContainer}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    elevation: 2,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ApplicationDetails;
