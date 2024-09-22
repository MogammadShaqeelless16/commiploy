import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator, Alert } from 'react-native';
import supabase from '../supabaseClient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileAlert from '../component/Profile/ProfileAlert';
import LocationDisplay from '../component/LocationDisplay';

const JobList = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error('Error fetching jobs');
      }

      setJobs(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const renderJobItem = ({ item }) => (
    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>
        <Icon name="work" size={20} color="#007bff" /> {item.title}
      </Text>
      <Text style={styles.jobDetails}>
        <Icon name="access-time" size={16} color="#888" /> Duration: {item.duration}
      </Text>
      <Text style={styles.jobDetails}>
        <Icon name="location-on" size={16} color="#888" /> Address: {item.address}
      </Text>
      <Text style={styles.jobDetails}>
        <Icon name="monetization-on" size={16} color="#888" /> Payment: ${item.payment.toFixed(2)}
      </Text>
      <Button title="View Details" onPress={() => navigation.navigate('JobDetails', { jobId: item.id })} />
    </View>
  );

  if (loadingJobs) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <View style={styles.container}>
      <ProfileAlert navigation={navigation} />
      <LocationDisplay /> {/* Use the LocationDisplay component */}
      <View style={styles.jobsSection}>
        <Text style={styles.jobsTitle}>Available Jobs</Text>
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderJobItem}
          ListEmptyComponent={<Text style={styles.noJobsText}>No jobs available.</Text>}
        />
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
  jobsSection: {
    flex: 1,
  },
  jobsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  jobCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobDetails: {
    fontSize: 16,
    marginTop: 4,
  },
  noJobsText: {
    textAlign: 'center',
    margin: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default JobList;
