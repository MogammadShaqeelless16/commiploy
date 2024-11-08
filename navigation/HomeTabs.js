import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Alert } from 'react-native';
import supabase from '../supabaseClient';
import { fetchProfile } from '../component/UserOperations/fetchProfile';

// Import your screens
import JobList from '../screens/JobList';
import BusinessList from '../screens/BusinessList';
import Services from '../screens/Services';
import FeedsList from '../screens/FeedsList';
import ProductsList from '../screens/ProductsList';
import Profile from '../screens/Profile';
import NewsScreen from '../screens/News';
import Login from '../screens/Login'; // Import the Login screen
import Loading from '../component/loadingComponent/loading';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const [profile, setProfile] = useState({
    first_name: '',
    profile_picture_url: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHustler, setIsHustler] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.log('No active session found, user not logged in');
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    setIsLoggedIn(true);
    console.log('User is logged in:', session.user.id);

    try {
      const userProfile = await fetchProfile(session.user.id);
      if (userProfile) {
        console.log('User profile fetched:', userProfile);
        setProfile({
          first_name: userProfile.first_name,
          profile_picture_url: userProfile.profile_picture_url,
        });
        setIsHustler(userProfile.roles.role_name === 'Hustler');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      Alert.alert('Error', 'Error fetching profile data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'FeedsList':
              iconName = 'home-outline';
              break;
            case 'JobList':
              iconName = 'briefcase-outline';
              break;
            case 'ProductsList':
              iconName = 'cart-outline';
              break;
            case 'BusinessList':
              iconName = 'storefront-outline';
              break;
            case 'Services':
              iconName = 'hammer-outline';
              break;
            case 'Profile':
            case 'Login': // Use the same icon for Profile and Login tabs
              iconName = 'person-outline';
              break;
            case 'News':
              iconName = 'newspaper-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return (
            <View>
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: '#f5bb1b',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="FeedsList" component={FeedsList} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="News" component={NewsScreen} options={{ tabBarLabel: 'News' }} />
      <Tab.Screen name="JobList" component={JobList} options={{ tabBarLabel: 'Jobs' }} />
      {!isHustler && (
      <Tab.Screen name="Services" component={Services} options={{ tabBarLabel: 'Services' }} />
       )}  
      {isLoggedIn ? (
        <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Profile' }} />
      ) : (
        <Tab.Screen name="Login" component={Login} options={{ tabBarLabel: 'Login' }} />
      )}
    </Tab.Navigator>
  );
};

export default HomeTabs;
