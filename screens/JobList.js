import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import supabase from '../supabaseClient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LocationDisplay from '../component/LocationDisplay';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
        <Icon name="work" size={20} color="#60b135" /> {item.title}
      </Text>
      <Text style={styles.jobDetails}>
        <Icon name="access-time" size={16} color="#888" /> Duration: {item.duration}
      </Text>
      <Text style={styles.jobDetails}>
        <Icon name="location-on" size={16} color="#888" /> Address: {item.address}
      </Text>
      <Text style={styles.jobDetails}>
        <Icon name="monetization-on" size={16} color="#888" /> Payment: R {item.payment.toFixed(2)}
      </Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate('JobDetails', { jobId: item.id })}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  if (loadingJobs) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007bff" />
        </TouchableOpacity>
      <LocationDisplay />
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
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
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
  detailsButton: {
    marginTop: 10,
    backgroundColor: '#60b135',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noJobsText: {
    textAlign: 'center',
    margin: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default JobList;
