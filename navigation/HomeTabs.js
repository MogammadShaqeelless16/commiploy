import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure Ionicons is properly installed
import { View, Text } from 'react-native';

// Import your screens
import JobList from '../screens/JobList';
import BusinessList from '../screens/BusinessList';
import Services from '../screens/Services';
import FeedsList from '../screens/FeedsList';
import ProductsList from '../screens/ProductsList'; 

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Set different icons for each route name
          switch (route.name) {
            case 'FeedsList':
              iconName = 'home-outline'; // Icon for the Home tab
              break;
            case 'JobList':
              iconName = 'briefcase-outline'; // Icon for Jobs
              break;
            case 'ProductsList':
              iconName = 'cart-outline'; // Icon for Products
              break;
            case 'BusinessList':
              iconName = 'storefront-outline'; // Icon for Business
              break;
            case 'Services':
              iconName = 'hammer-outline'; // Icon for Services
              break;
            default:
              iconName = 'help-circle-outline'; // Default icon
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
        tabBarActiveTintColor: '#f5bb1b',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Hide header for all tabs
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
