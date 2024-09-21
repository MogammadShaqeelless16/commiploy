import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';
import { fetchProfile } from '../component/UserOperations/fetchProfile';

import CrecheList from '../screens/CrecheList';
import YourApplications from '../screens/YourApplications';
import NotificationsScreen from '../screens/Notifications';
import Transport from '../screens/Transport';
import FeedsList from '../screens/FeedsList';
import MyCentre from '../screens/MyCentre';
import supabase from '../supabaseClient';  // Import your supabase client

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const profile = await fetchProfile();  // Assuming you have a function to fetch the user profile

        const { data: notificationsData, error } = await supabase
          .from('notifications')
          .select('id')
          .eq('user_id', profile.id)
          .is('deleted', false);

        if (error) {
          console.error('Error fetching notification count:', error.message);
          return;
        }

        setNotificationCount(notificationsData.length);  // Update the notification count
      } catch (fetchError) {
        console.error('Error fetching notifications:', fetchError.message);
      }
    };

    fetchNotificationCount();

    const intervalId = setInterval(fetchNotificationCount, 60000); // Fetch every 60 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'CrecheList':
              iconName = 'earth-outline';
              break;
            case 'ApplicationList':
              iconName = 'global';
              break;
            case 'MyCentre':
              iconName = 'school';
              break;
            case 'Notifications':
              iconName = 'notifications';
              break;
            case 'Transport':
              iconName = 'car';
              break;
            case 'FeedsList':
              iconName = 'reader';
              break;
            default:
              iconName = 'help-circle';
          }

          return (
            <View>
              <Ionicons name={iconName} size={size} color={color} />
              {route.name === 'Notifications' && notificationCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: -10,
                    top: -3,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                    {notificationCount}
                  </Text>
                </View>
              )}
            </View>
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="FeedsList" component={FeedsList} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="CrecheList" component={CrecheList} options={{ tabBarLabel: 'Explore' }} />
      <Tab.Screen name="MyCentre" component={MyCentre} options={{ tabBarLabel: 'My Centres' }} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ tabBarLabel: 'Notifications' }} />
      <Tab.Screen name="Transport" component={Transport} options={{ tabBarLabel: 'Transport' }} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
