import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import supabase from '../supabaseClient';

const MyCentre = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [localProducts, setLocalProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobsAndProducts();
  }, []);

  const fetchJobsAndProducts = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch jobs
        const { data: jobData, error: jobError } = await supabase
          .from('jobs') // Replace with the actual table name for jobs
          .select('*')
          .eq('user_id', user.id);

        if (jobError) {
          throw jobError;
        }

        setJobs(jobData);

        // Fetch local products
        const { data: productData, error: productError } = await supabase
          .from('products') // Replace with the actual table name for products
          .select('*');

        if (productError) {
          throw productError;
        }

        setLocalProducts(productData);
      } else {
        Alert.alert('Error', 'Unable to fetch user information');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Error fetching jobs and products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (jobs.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noJobsText}>Hi there, it looks like you haven't applied for any jobs yet.</Text>
        <Text style={styles.noJobsText}>Consider browsing local job opportunities or available products.</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('BrowseJobs')}
          >
            <Text style={styles.buttonText}>Browse Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('BrowseProducts')}
          >
            <Text style={styles.buttonText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Opportunities</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobDetails}>Description: {item.description}</Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate('JobDetails', { jobId: item.id })}
            >
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default MyCentre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  jobCard: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  noJobsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  detailsButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  detailsButtonText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
});
