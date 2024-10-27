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
import ArtBackground from '../component/BackgroundSprites/ArtBackground';
import OpenDrawerButton from '../component/OpenDrawerButton';
import NotificationButton from '../component/NotificationButton';
import CartButton from '../component/CartButton';
import { fetchProfile } from '../component/UserOperations/fetchProfile';
import CrmDashboard from '../component/Feeds/Dashboard';

const { width: screenWidth } = Dimensions.get('window');

const FeedsList = ({ navigation }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [showProfileAlert, setShowProfileAlert] = useState(!isLoggedIn);
  const [products, setProducts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState({
    first_name: '',
    profile_picture_url: '',
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null); // Use a single state for role

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (role === null) return; // Wait until the role is determined

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
  }, [role]); // Fetch data whenever the role changes

  const fetchUserProfile = async () => {
    setLoading(true); // Start loading before fetching profile

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.log('No active session found, user not logged in');
      setLoading(false); // End loading if there's no session
      return;
    }

    console.log('User is logged in:', session.user.id);

    try {
      const userProfile = await fetchProfile(session.user.id);
      if (userProfile) {
        console.log('User profile fetched:', userProfile);
        setProfile({
          first_name: userProfile.first_name,
          profile_picture_url: userProfile.profile_picture_url,
        });
        setRole(userProfile.roles.role_name); // Set the role directly
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false); // End loading once profile fetch is done
    }
  };

  if (loading) {
    return <Loading />;
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

        {role === 'Developer' && <CrmDashboard />}

        {role !== 'Developer' && ( // Check role here
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        )}

        <CategoryCard navigation={navigation} />

        <SectionHeader
          title="Service Providers"
          navigation={navigation}
          navigateTo="Services"
          iconName="wrench"
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedsList;
