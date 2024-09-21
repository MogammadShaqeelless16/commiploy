import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, StyleSheet, View } from 'react-native';
import { useProfile } from '../component/Profile/useProfile';
import ProfilePicture from '../component/Profile/ProfilePicture';
import ProfileForm from '../component/Profile/ProfileForm';
import ProfileActions from '../component/Profile/ProfileActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using React Navigation
import supabase from '../supabaseClient';

const Profile = () => {
  const { profile, loading, updateProfile, error } = useProfile();
  const [localProfile, setLocalProfile] = useState(profile);
  const navigation = useNavigation(); // For navigation

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
      console.log('Logging out...');
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) {
        Alert.alert('Error', 'Error logging out');
        console.error('Logout Error:', logoutError);
      } else {
        await AsyncStorage.removeItem('userSession');
        navigation.replace('Login'); // Navigate to the login screen
      }
    } catch (error) {
      Alert.alert('Error', 'Error logging out');
      console.error('Logout Error:', error);
    }
  };

  const handleProfileChange = (field, value) => {
    console.log(`Profile field changed: ${field} = ${value}`);
    setLocalProfile({ ...localProfile, [field]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfilePicture profile={localProfile} onEdit={() => { /* Handle profile picture edit */ }} />
      <ProfileForm profile={localProfile} onChange={handleProfileChange} />
      <ProfileActions loading={loading} onUpdateProfile={handleUpdateProfile} onLogout={handleLogout} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default Profile;
