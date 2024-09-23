import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, Dimensions, FlatList, View, ActivityIndicator, Text } from 'react-native';
import ProductCard from '../component/Feeds/ProductCard';
import JobCard from '../component/Feeds/JobCard';
import ServiceProviderCard from '../component/Feeds/ServiceProviderCard';
import SectionHeader from '../component/Feeds/SectionHeader';
import ProfileAlert from '../component/Profile/ProfileAlert';
import ProfileCompletion from '../component/Profile/ProfileCompletion'; // Import the new component
import { AuthContext } from '../context/AuthContext';
import supabase from '../supabaseClient'; // Import your Supabase client

const { width: screenWidth } = Dimensions.get('window');

const FeedsList = ({ navigation }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [showProfileAlert, setShowProfileAlert] = useState(!isLoggedIn);
  const [products, setProducts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*');

        if (productError) throw productError;
        setProducts(productData);

        // Fetch jobs
        const { data: jobData, error: jobError } = await supabase
          .from('jobs')
          .select('*');

        if (jobError) throw jobError;
        setJobs(jobData);

        // Fetch services
        const { data: serviceData, error: serviceError } = await supabase
          .from('services')
          .select('*');

        if (serviceError) throw serviceError;
        setServices(serviceData);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {showProfileAlert && (
        <ProfileAlert 
          navigation={navigation} 
          onClose={() => setShowProfileAlert(false)} 
        />
      )}
      
      {isLoggedIn && <ProfileCompletion />} {/* Render ProfileCompletion component here */}

      <SectionHeader title="Nearby Products" />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />} // Pass navigation
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
      <SectionHeader title="Nearby Jobs" />
      <FlatList
        data={jobs}
        renderItem={({ item }) => <JobCard job={item} navigation={navigation} />} // Pass navigation
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
      <SectionHeader title="Service Providers" />
      <FlatList
        data={services}
        renderItem={({ item }) => <ServiceProviderCard service={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.verticalList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  horizontalList: {
    paddingVertical: 10,
  },
  verticalList: {
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedsList;
