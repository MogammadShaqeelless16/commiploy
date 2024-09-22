import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';
import { fetchProfile } from '../component/UserOperations/fetchProfile';

import JobList from '../screens/JobList';
import YourApplications from '../screens/YourApplications';
import BusinessList from '../screens/BusinessList';
import Services from '../screens/Services';
import FeedsList from '../screens/FeedsList';
import MyCentre from '../screens/MyCentre';
import ProductsList from '../screens/ProductsList'; // New ProductsList screen
import supabase from '../supabaseClient'; 

const Tab = createBottomTabNavigator();

const HomeTabs = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'JobList':
              iconName = 'briefcase'; // Updated to a briefcase icon for jobs
              break;
            case 'ApplicationList':
              iconName = 'paper'; // New icon for applications
              break;
            case 'ProductsList':
              iconName = 'cart'; // Icon for products
              break;
            case 'MyCentre':
              iconName = 'school';
              break;
            case 'Business':
              iconName = 'business';
              break;
            case 'Services':
              iconName = 'construct-outline';
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
      <Tab.Screen name="JobList" component={JobList} options={{ tabBarLabel: 'Jobs' }} />
      <Tab.Screen name="ProductsList" component={ProductsList} options={{ tabBarLabel: 'Products' }} />
      <Tab.Screen name="BusinessList" component={BusinessList} options={{ tabBarLabel: 'Business' }} />
      <Tab.Screen name="Services" component={Services} options={{ tabBarLabel: 'Services' }} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
