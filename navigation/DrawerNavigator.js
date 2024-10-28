import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import supabase from '../supabaseClient';
import { fetchProfile } from '../component/UserOperations/fetchProfile';

import HomeTabs from './HomeTabs';
import News from '../screens/News';
import Help from '../screens/Help';
import Support from '../screens/Support';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import DeveloperScreen from '../screens/developer/DeveloperScreen';
import BecomeAHustler from '../screens/BecomeAHustler';
import ListYourBusiness from '../screens/ListYourBusiness';
import YourApplications from '../screens/YourApplications';
import Switch from '../screens/settings/Switch';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation }) => {
  const [profile, setProfile] = useState({
    first_name: '',
    profile_picture_url: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.log('No active session found, user not logged in');
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
        setRole(userProfile.roles.role_name); 
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      Alert.alert('Error', 'Error fetching profile data');
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const CustomDrawerItem = ({ label, icon, onPress }) => (
    <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
      {icon}
      <Text style={styles.drawerItemLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <View style={styles.profileContainer}>
          {isLoggedIn ? (
            <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
              <Image source={{ uri: profile.profile_picture_url }} style={styles.profileImage} />
              <Text style={styles.profileName}>{profile.first_name || 'User Name'}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>You are not logged in</Text>
              <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
                <Ionicons name="log-in" size={20} color="#fff" />
                <Text style={styles.authButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.authButton} onPress={handleSignUp}>
                <Ionicons name="person-add" size={20} color="#fff" />
                <Text style={styles.authButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.drawerItemsContainer}>
          <CustomDrawerItem
            label="Home"
            icon={<Ionicons name="home" size={20} color="#007BFF" />}
            onPress={() => props.navigation.navigate('Home')}
          />

          {role === 'Business Owner' && (
            <CustomDrawerItem
              label="My Business"
              icon={<Ionicons name="storefront-outline" size={20} color="#007BFF" />}
              onPress={() => props.navigation.navigate('ChatListScreen')}
            />
          )}
          {role !== 'Hustler' && (
            <CustomDrawerItem
              label="My Applications"
              icon={<Ionicons name="apps" size={20} color="#007BFF" />}
              onPress={() => props.navigation.navigate('YourApplications')}
            />
          )}
          {role === 'Developer' && (
            <CustomDrawerItem
              label="Developer"
              icon={<Ionicons name="code" size={20} color="#007BFF" />}
              onPress={() => props.navigation.navigate('DeveloperScreen')}
            />
          )}
          {role !== 'Hustler' && (
            <CustomDrawerItem
              label="Become a Hustler"
              icon={<Ionicons name="hammer" size={20} color="#007BFF" />}
              onPress={() => props.navigation.navigate('BecomeAHustler')}
            />
          )}
          {role !== 'Business Owner' && (
            <CustomDrawerItem
              label="List Your Business"
              icon={<Ionicons name="business" size={20} color="#007BFF" />}
              onPress={() => props.navigation.navigate('ListYourBusiness')}
            />
          )}
          <CustomDrawerItem
            label="Switch Role"
            icon={<Ionicons name="swap-horizontal" size={20} color="#007BFF" />}
            onPress={() => props.navigation.navigate('Switch')}
          />
        </View>

        <View style={styles.bottomDrawerSection}>
          <CustomDrawerItem
            label="Help"
            icon={<Ionicons name="help-circle" size={20} color="#007BFF" />}
            onPress={() => props.navigation.navigate('Help')}
          />
          <CustomDrawerItem
            label="Support"
            icon={<Ionicons name="headset" size={20} color="#007BFF" />}
            onPress={() => props.navigation.navigate('Support')}
          />
        </View>
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#ffffff',
          width: 240,
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
      <Drawer.Screen name="Profile" component={Profile} />
      {isLoggedIn && <Drawer.Screen name="Settings" component={Settings} />}
      <Drawer.Screen name="Switch" component={Switch} />
      {role !== 'Hustler' && <Drawer.Screen name="BecomeAHustler" component={BecomeAHustler} />}
      {role !== 'Business Owner' && <Drawer.Screen name="ListYourBusiness" component={ListYourBusiness} />}
      <Drawer.Screen name="News" component={News} />
      <Drawer.Screen name="Help" component={Help} />
      <Drawer.Screen name="Support" component={Support} />
      {isLoggedIn && <Drawer.Screen name="YourApplications" component={YourApplications} />}
      {role === 'Developer' && <Drawer.Screen name="DeveloperScreen" component={DeveloperScreen} />}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    justifyContent: 'center',
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  drawerItemsContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  drawerItemLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  bottomDrawerSection: {
    borderTopColor: '#f0f4f8',
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
