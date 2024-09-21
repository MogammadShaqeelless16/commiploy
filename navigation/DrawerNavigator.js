import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import supabase from '../supabaseClient';

import HomeTabs from './HomeTabs';
import Settings from '../screens/Settings';
import Transport from '../screens/Transport';
import News from '../screens/News';
import Help from '../screens/Help'; 
import Support from '../screens/Support'; 
import Profile from '../screens/Profile'; 
import YourApplications from '../screens/YourApplications';
import ChatListScreen from '../screens/chat/ChatListScreen';
import DeveloperScreen from '../screens/developer/DeveloperScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [profile, setProfile] = useState({
    display_name: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    id_number: '',
    profile_picture_url: '',
    bio: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      Alert.alert('Error', 'Unable to fetch user session');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('users')
      .select(`
        display_name, email, first_name, last_name,
        phone_number, id_number, profile_picture_url, bio, roles(role_name)
      `)
      .eq('id', session.user.id)
      .single();

    if (error) {
      Alert.alert('Error', 'Error fetching profile data');
      console.error('Profile Fetch Error:', error);
    } else {
      setProfile({
        display_name: data.display_name,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        id_number: data.id_number,
        profile_picture_url: data.profile_picture_url,
        bio: data.bio,
        role: data.roles.role_name
      });

      setIsDeveloper(data.roles.role_name === 'Developer');
    }
    setLoading(false);
  };

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
            <Image
              source={{ uri: profile.profile_picture_url }} 
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{profile.display_name || 'User Name'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.drawerItemsContainer}>
          <DrawerItem
            label="Home"
            icon={({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            )}
            onPress={() => props.navigation.navigate('Home')}
          />
          <DrawerItem
            label="Settings"
            icon={({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            )}
            onPress={() => props.navigation.navigate('Settings')}
          />
          <DrawerItem
            label="Messages"
            icon={({ color, size }) => (
              <Ionicons name="chatbubble" size={size} color={color} />
            )}
            onPress={() => props.navigation.navigate('ChatListScreen')}
          />
          <DrawerItem
            label="News"
            icon={({ color, size }) => (
              <Ionicons name="newspaper" size={size} color={color} />
            )}
            onPress={() => props.navigation.navigate('News')}
          />
          <DrawerItem
            label="My Applications"
            icon={({ color, size }) => (
              <Ionicons name="apps" size={size} color={color} />
            )}
            onPress={() => props.navigation.navigate('YourApplications')}
          />
          {isDeveloper && (
            <DrawerItem
              label="Developer"
              icon={({ color, size }) => (
                <Ionicons name="code" size={size} color={color} />
              )}
              onPress={() => props.navigation.navigate('DeveloperScreen')}
            />
          )}
        </View>

        <View style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Help"
            icon={({ color, size }) => (
              <Ionicons name="help-circle" size={size} color={color} />
            )}
            onPress={() => props.navigation.navigate('Help')}
          />
          <DrawerItem
            label="Support"
            icon={({ color, size }) => (
              <Ionicons name="headset" size={size} color={color} />
            )}
            onPress={() => props.navigation.navigate('Support')}
          />
        </View>
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        drawerIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            case 'ChatListScreen':
              iconName = 'chatbubble';
              break;
            case 'News':
              iconName = 'newspaper';
              break;
            case 'My Applications':
              iconName = 'document';
              break;
            case 'Help':
              iconName = 'help-circle';
              break;
            case 'Support':
              iconName = 'headset';
              break;
            case 'DeveloperScreen':
              iconName = 'code';
              break;
            default:
              iconName = 'help-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="ChatListScreen" component={ChatListScreen} />
      <Drawer.Screen name="News" component={News} />
      <Drawer.Screen name="Help" component={Help} />
      <Drawer.Screen name="Support" component={Support} />
      <Drawer.Screen name="YourApplications" component={YourApplications} />
      {isDeveloper && (
        <Drawer.Screen name="DeveloperScreen" component={DeveloperScreen} />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerItemsContainer: {
    flex: 1,
    marginTop: 10,
  },
  bottomDrawerSection: {
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
});
