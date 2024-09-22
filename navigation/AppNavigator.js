import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './OnboardingNavigator';
import DrawerNavigator from './DrawerNavigator'; // Main app drawer
import Login from '../screens/Login';
import SignUp from '../screens/Signup';
import JobDetails from '../screens/JobDetails';
import ApplicationDetails from '../screens/ApplicationDetails';
import Apply from '../screens/Apply';
import EditApplication from '../screens/EditApplication';
import ForgotPassword from '../screens/ForgotPassword';
import MyCentreDetails from '../screens/MyCentreDetails';
import LessonsDetails from '../screens/mycreche/LessonsDetails'
import FeedDetails from '../screens/ProductItem';
import ChatScreen from '../screens/chat/ChatScreen';
import UserProfileScreen from '../screens/chat/UserProfileScreen';
import DeveloperScreen from '../screens/developer/DeveloperScreen';
import NewsDetails from '../screens/NewsDetails';
import ChangePassword from '../screens/ChangePassword';
import ServiceItem from '../screens/services/ServiceItem';
import ServiceDetails from '../screens/services/ServiceDetails'; 
import BusinessDetails from '../screens/business/BusinessDetails';
import UserProfileDetails from '../screens/UserProfileDetails';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileAlert, setShowProfileAlert] = useState(true); // Manage visibility here


  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('onboardingCompleted');
        setIsOnboardingComplete(status === 'true');
      } catch (error) {
        console.error('Failed to check onboarding status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      setIsOnboardingComplete(true);
    } catch (error) {
      console.error('Failed to set onboarding status:', error);
    }
  };

  if (isLoading) {
    // You can return a loading spinner or splash screen here
    return null;
  }

  return (
    <Stack.Navigator>
      {!isOnboardingComplete ? (
        <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
          {props => <OnboardingScreen {...props} onComplete={handleOnboardingComplete} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Apply" component={Apply} options={{ headerShown: false }} />
          <Stack.Screen name="JobDetails" component={JobDetails} options={{ headerShown: false }} />
          <Stack.Screen name="ApplicationDetails" component={ApplicationDetails} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="EditApplication" component={EditApplication} options={{ headerShown: false }} /> 
          <Stack.Screen name="MyCentreDetails" component={MyCentreDetails} options={{ headerShown: false }} />
          <Stack.Screen name="LessonsDetails" component={LessonsDetails} options={{ headerShown: false }} />
          <Stack.Screen name="FeedDetails" component={FeedDetails} options={{ headerShown: false }} />
          <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DeveloperScreen" component={DeveloperScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NewsDetails" component={NewsDetails} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
          <Stack.Screen name="ServiceDetails" component={ServiceDetails} options={{ headerShown: false }} />
          <Stack.Screen name="BusinessDetails" component={BusinessDetails} options={{ headerShown: false }} />
          <Stack.Screen name="UserProfileDetails" component={UserProfileDetails} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />

        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
