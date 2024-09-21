import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import supabase from '../../supabaseClient';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserProfileScreen = () => {
  const [user, setUser] = useState(null);
  const route = useRoute();
  const navigation = useNavigation(); // Access navigation prop
  const { userId } = route.params;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) throw error;

        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  const handleReportDriver = () => {
    // Navigate to the Support screen
    navigation.navigate('Support'); // Replace 'SupportScreen' with the actual route name
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {user.profile_picture ? (
          <Image
            source={{ uri: user.profile_picture }}
            style={styles.profilePicture}
          />
        ) : (
          <View style={styles.profilePicture}>
            <Text style={styles.initials}>{user.display_name[0]}</Text>
          </View>
        )}
        <Text style={styles.title}>{user.display_name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{user.phone_number}</Text>
        <Text style={styles.label}>Suburb:</Text>
        <Text style={styles.value}>{user.suburb}</Text>
        <Text style={styles.label}>Price Per Head:</Text>
        <Text style={styles.value}>R {user.price}</Text>
      </View>
      <TouchableOpacity style={styles.reportButton} onPress={handleReportDriver}>
        <Icon name="exclamation-triangle" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Report Driver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  initials: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  reportButton: {
    backgroundColor: '#e63946', // Red background color
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default UserProfileScreen;
