import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import supabase from '../supabaseClient';

const JobList = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [streetName, setStreetName] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setUserLocation(location.coords);
      await fetchStreetName(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      setErrorMsg('Error fetching location: ' + error.message);
    }
  };

  const fetchStreetName = async (latitude, longitude) => {
    try {
      const response = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (response.length > 0) {
        setStreetName(response[0].name || 'Unknown location');
      }
    } catch (error) {
      console.error('Error fetching street name:', error);
    }
  };

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
    fetchLocation();
    fetchJobs();
  }, []);

  const renderJobItem = ({ item }) => (
    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobDetails}>Duration: {item.duration}</Text>
      <Text style={styles.jobDetails}>Address: {item.address}</Text>
      <Text style={styles.jobDetails}>Payment: ${item.payment.toFixed(2)}</Text>
      <Button title="View Details" onPress={() => navigation.navigate('JobDetails', { jobId: item.id })} />
    </View>
  );

  if (loadingJobs) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.locationSection}>
        <Text style={styles.locationTitle}>Your Location:</Text>
        <Text style={styles.locationText}>{streetName || errorMsg || 'Fetching location...'}</Text>
      </View>

      <View style={styles.jobsSection}>
        <Text style={styles.jobsTitle}>Available Jobs</Text>
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderJobItem}
          ListEmptyComponent={<Text style={styles.noJobsText}>No jobs available.</Text>}
        />
      </View>
      <Button title="Refresh Location" onPress={fetchLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  locationSection: {
    backgroundColor: '#e1f5fe',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 16,
    marginTop: 8,
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
