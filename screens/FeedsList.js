import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, Dimensions, FlatList, View, ActivityIndicator, Text } from 'react-native';
import ProductCard from '../component/Feeds/ProductCard';
import JobCard from '../component/Feeds/JobCard';
import ServiceProviderCard from '../component/Feeds/ServiceProviderCard';
import SectionHeader from '../component/Feeds/SectionHeader';
import ProfileAlert from '../component/Profile/ProfileAlert';
import { AuthContext } from '../context/AuthContext';
import supabase from '../supabaseClient';
import LocationDisplay from '../component/LocationDisplay';
import Loading from '../component/loadingComponent/loading';
import CategoryCard from '../component/Feeds/CategoryCard';
import WelcomeMessage from '../component/Feeds/WelcomeText';
const { width: screenWidth } = Dimensions.get('window');
import ArtBackground from '../component/BackgroundSprites/ArtBackground';
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
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*');

        if (productError) throw productError;
        setProducts(productData);

        const { data: jobData, error: jobError } = await supabase
          .from('jobs')
          .select('*');

        if (jobError) throw jobError;
        setJobs(jobData);

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
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container}>
      <ArtBackground>
      <WelcomeMessage />
      <LocationDisplay />

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
      
      <CategoryCard navigation={navigation} />


 
 
 
 
     {/* 

      <SectionHeader 
        title="Nearby Jobs" 
        navigation={navigation} 
        navigateTo="JobList" 
        iconName="suitcase" // Icon for jobs
      />
      <FlatList
        data={jobs}
        renderItem={({ item }) => <JobCard job={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
      */}
  
      <SectionHeader 
        title="Service Providers" 
        navigation={navigation} 
        navigateTo="Services" 
        iconName="wrench" // Icon for services
      />
      <FlatList
        data={services.slice(0, 4)} // Limit to the first 4 services
        renderItem={({ item }) => <ServiceProviderCard service={item} navigation={navigation} />}
        keyExtractor={item => item.id.toString()} // Ensure keyExtractor uses a string
        numColumns={2}
        contentContainerStyle={styles.verticalList}
      />
      </ArtBackground>
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
