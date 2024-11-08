import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Dimensions, FlatList, View , ActivityIndicator , Text} from 'react-native';
import ProductCard from '../component/Feeds/ProductCard';
import JobCard from '../component/Feeds/JobCard';
import ServiceProviderCard from '../component/Feeds/ServiceProviderCard';
import SectionHeader from '../component/Feeds/SectionHeader';
import supabase from '../supabaseClient';
import LocationDisplay from '../component/LocationDisplay';
import Loading from '../component/loadingComponent/loading';
import CategoryCard from '../component/Feeds/CategoryCard';
import WelcomeMessage from '../component/Feeds/WelcomeText';
import ArtBackground from '../component/BackgroundSprites/ArtBackground';
import OpenDrawerButton from '../component/OpenDrawerButton';
import NotificationButton from '../component/NotificationButton';
import CartButton from '../component/CartButton';
import { fetchProfile } from '../component/UserOperations/fetchProfile';
import CrmDashboard from '../component/Feeds/Dashboard';
import BusinessCards from '../component/Feeds/BusinessCard';
import BusinessAnalytics from '../component/Feeds/BusinessAnalytics';
import HustlerDashboard from '../component/Feeds/HustlerDashboard';
import HustlerCard from '../component/Feeds/HustlersCard';
import WritePost from '../component/Feeds/WritePost';

const { width: screenWidth } = Dimensions.get('window');

const FeedsList = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [services, setServices] = useState([]);
  const [profile, setProfile] = useState({
    first_name: '',
    profile_picture_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    fetchUserProfile();
    fetchData();
  }, []);

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

  const fetchUserProfile = async () => {
    setLoading(true);

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.log('No active session found, user not logged in');
      setLoading(false);
      return;
    }

    try {
      const userProfile = await fetchProfile(session.user.id);
      if (userProfile) {
        setProfile({
          first_name: userProfile.first_name,
          profile_picture_url: userProfile.profile_picture_url,
        });
        setRole(userProfile.roles.role_name);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <ArtBackground>
        <View style={styles.headerContainer}>
          <OpenDrawerButton />
          <View style={styles.rightButtons}>
            <CartButton />
            <NotificationButton />
          </View>
        </View>

        <WelcomeMessage />
        <LocationDisplay />

        {/* Only render WritePost if user is logged in */}
        {profile.first_name && (
          <WritePost onPost={(text) => console.log("User posted:", text)} />
        )}

        {role === 'Business Owner' ? (
          <>
            <CrmDashboard />
            <BusinessCards />
            <BusinessAnalytics />
          </>
        ) : role === 'Hustler' ? (
          <>
            <HustlerDashboard />
            <HustlerCard />
            <FlatList
              data={products}
              renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </>
        ) : (
          <>
                <FlatList
        data={jobs}
        renderItem={({ item }) => <JobCard job={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

            <FlatList
              data={services.slice(0, 4)}
              renderItem={({ item }) => <ServiceProviderCard service={item} navigation={navigation} />}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.verticalList}
            />
          </>
        )}
      </ArtBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalList: {
    paddingVertical: 10,
  },
  verticalList: {
    paddingVertical: 10,
  },
});

export default FeedsList;
