import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useProfile } from '../component/Profile/useProfile';
import ProfilePicture from '../component/Profile/ProfilePicture';
import ProfileForm from '../component/Profile/ProfileForm';
import ProfileActions from '../component/Profile/ProfileActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import supabase from '../supabaseClient';
import ArtBackground from '../component/BackgroundSprites/ArtBackground';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const Profile = () => {
  const { profile, loading, updateProfile, error } = useProfile();
  const [localProfile, setLocalProfile] = useState(profile);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Profile data updated:', profile);
    setLocalProfile(profile);
  }, [profile]);

  const handleUpdateProfile = async () => {
    try {
      console.log('Updating profile with data:', localProfile);
      await updateProfile(localProfile);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (err) {
      Alert.alert('Error', 'Error updating profile');
      console.error('Profile Update Error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      // Retrieve the current session to ensure it's valid before logout
      const session = await supabase.auth.getSession();

      if (!session) {
        // If no session is found, notify the user to log in again
        Alert.alert('Session Expired', 'Please log in again.');
        navigation.navigate('Login');
        return;
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear AsyncStorage upon successful sign out
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'DrawerNavigator' }],
      });
      Alert.alert('Logged out', 'You have been successfully logged out.');
    } catch (err) {
      Alert.alert('Error', `Logout failed: ${err.message}`);
      console.error('Logout Error:', err);
    }
  };

  const handleProfileChange = (field, value) => {
    console.log(`Profile field changed: ${field} = ${value}`);
    setLocalProfile({ ...localProfile, [field]: value });
  };

  // Conditional rendering based on user authentication
  if (!profile) {
    return (
      <ArtBackground>
        <View style={styles.notLoggedInContainer}>
          <Text style={styles.notLoggedInText}>
            Oh no! We see you are not logged in. Please register or login to
            start purchasing and getting services.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Icon name="login" size={20} color="#fff" />
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Icon name="person-add" size={20} color="#fff" />
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ArtBackground>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfilePicture
        profile={localProfile}
        onEdit={() => {
          /* Handle profile picture edit */
        }}
      />
      <ProfileForm profile={localProfile} onChange={handleProfileChange} />
      <ProfileActions
        loading={loading}
        onUpdateProfile={handleUpdateProfile}
        onLogout={handleLogout}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notLoggedInText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF', // Modern blue color
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    width: '80%', // Ensure buttons are not too wide
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8, // Space between icon and text
  },
});

export default Profile;
