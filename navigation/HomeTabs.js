import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';

// Import your screens
import JobList from '../screens/JobList';
import BusinessList from '../screens/BusinessList';
import Services from '../screens/Services';
import FeedsList from '../screens/FeedsList';
import ProductsList from '../screens/ProductsList';

const Tab = createBottomTabNavigator();

const HomeTabs = ({ userRole }) => {
  // Conditional rendering logic based on roles
  const isProgrammer = userRole === 'Programming';
  const isBusinessOwner = userRole === 'Business';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Set different icons for each route name
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
      {isProgrammer && (
        <Tab.Screen name="JobList" component={JobList} options={{ tabBarLabel: 'Jobs' }} />
      )}
      <Tab.Screen name="ProductsList" component={ProductsList} options={{ tabBarLabel: 'Products' }} />
      {isBusinessOwner && (
        <Tab.Screen name="BusinessList" component={BusinessList} options={{ tabBarLabel: 'Business' }} />
      )}
      <Tab.Screen name="Services" component={Services} options={{ tabBarLabel: 'Services' }} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
