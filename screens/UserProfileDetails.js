import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import supabase from '../supabaseClient';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this installed

const UserProfileDetails = ({ route, navigation }) => {
  const { userId } = route.params; // Assuming userId is passed as a parameter
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    setLoading(true);
    console.log("Fetching details for user ID:", userId);
    try {
      const { data, error } = await supabase
        .from('users') // Adjust the table name as necessary
        .select('*')
        .eq('id', userId)
        .single();

      console.log("Fetched Data:", data);
      if (error) {
        console.error("Error:", error);
        throw new Error('Error fetching user details');
      }

      setUser(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]); // Dependency array to re-fetch if userId changes

  const handleReportUser = () => {
    // Add your reporting logic here
    Alert.alert('Report User', 'User has been reported.');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  if (!user) {
    return <Text style={styles.errorText}>No user details found for ID: {userId}</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Image source={{ uri: user.profile_picture }} style={styles.profileImage} />
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userDetails}>Email: {user.email}</Text>
      <Text style={styles.userDetails}>Phone: {user.phone}</Text>
      <Text style={styles.userDetails}>Address: {user.address}</Text>
      <Text style={styles.userDetails}>Bio: {user.bio}</Text>
      <View style={styles.socialContainer}>
        <Text style={styles.socialMedia}>Facebook: {user.social_media_facebook}</Text>
        <Text style={styles.socialMedia}>Instagram: {user.social_media_instagram}</Text>
        <Text style={styles.socialMedia}>Twitter: {user.social_media_twitter}</Text>
        <Text style={styles.socialMedia}>LinkedIn: {user.social_media_linkedin}</Text>
      </View>
      <TouchableOpacity style={styles.reportButton} onPress={handleReportUser}>
        <Ionicons name="alert-circle" size={24} color="white" />
        <Text style={styles.reportButtonText}>Report User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#007bff', // Optional: border color for the image
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  userDetails: {
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
  },
  socialContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 16,
  },
  socialMedia: {
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
    color: '#007bff', // Optional: style social media links
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  reportButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default UserProfileDetails;
