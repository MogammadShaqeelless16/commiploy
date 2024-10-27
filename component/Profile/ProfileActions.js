import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import supabase from '../../supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileActions = ({ loading, onUpdateProfile }) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
  
      // Clear AsyncStorage
      await AsyncStorage.clear();
  
      // Reset the navigation state and navigate to DrawerNavigator
      navigation.reset({
        index: 0,
        routes: [{ name: 'DrawerNavigator' }], // Ensure 'DrawerNavigator' matches your route name
      });
  
      // Alert for successful logout
      Alert.alert('Logged out', 'You have been successfully logged out.');
    } catch (err) {
      Alert.alert('Error', `Logout failed: ${err.message}`);
    }
  };
  

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={onUpdateProfile}
        disabled={loading}
      >
        <Icon name="save" size={20} color="#fff" />
        <Text style={styles.buttonText}>
          {loading ? 'Updating...' : 'Update Profile'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <Icon name="sign-out" size={20} color="#fff" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default ProfileActions;
