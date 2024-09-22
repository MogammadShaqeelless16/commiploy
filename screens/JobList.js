import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import supabase from '../supabaseClient'; // Make sure to import your Supabase client

const JobList = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setErrorMsg(null);
      fetchJobs(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      setErrorMsg('Error fetching location: ' + error.message);
    }
  };

  const fetchJobs = async (latitude, longitude) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('latitude', latitude)
        .eq('longitude', longitude);

      if (error) {
        throw new Error('Error fetching jobs');
      }

      setJobs(data);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Jobs Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : userLocation ? (
        <View>
          <Text style={styles.text}>Your Location:</Text>
          <Text style={styles.text}>Latitude: {userLocation.latitude}</Text>
          <Text style={styles.text}>Longitude: {userLocation.longitude}</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <FlatList
              data={jobs}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.jobCard}>
                  <Text style={styles.jobTitle}>{item.title}</Text>
                  <Text style={styles.jobDetails}>Duration: {item.duration}</Text>
                  <Text style={styles.jobDetails}>Location: {item.address}</Text>
                  <Text style={styles.jobDetails}>Payment: ${item.payment}</Text>
                </View>
              )}
              ListEmptyComponent={<Text style={styles.noJobsText}>No jobs available.</Text>}
            />
          )}
        </View>
      ) : (
        <Text style={styles.text}>Fetching your location...</Text>
      )}
      <Button title="Refresh Location" onPress={fetchLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  jobCard: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    width: '100%',
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  jobDetails: {
    fontSize: 16,
  },
  noJobsText: {
    textAlign: 'center',
    margin: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default JobList;
