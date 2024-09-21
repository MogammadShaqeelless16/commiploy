import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Settings = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log("Logout pressed");
    // Add your logout logic here
  };

  const handleDeleteAccount = () => {
    console.log("Delete Account pressed");
    // Add your account deletion logic here
  };

  const openURL = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Profile')}>
        <Icon name="user" size={20} color="#4a90e2" />
        <Text style={styles.optionText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangePassword')}>
        <Icon name="lock" size={20} color="#4a90e2" />
        <Text style={styles.optionText}>Change Password</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Notification Settings</Text>
      <TouchableOpacity style={styles.option}>
        <Icon name="bell" size={20} color="#4a90e2" />
        <Text style={styles.optionText}>Manage Notifications</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Privacy Settings</Text>
      <TouchableOpacity style={styles.option}>
        <Icon name="shield" size={20} color="#4a90e2" />
        <Text style={styles.optionText}>Manage Privacy Preferences</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>App Settings</Text>
      <TouchableOpacity style={styles.option}>
        <Icon name="tint" size={20} color="#4a90e2" />
        <Text style={styles.optionText}>Change Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Icon name="language" size={20} color="#4a90e2" />
        <Text style={styles.optionText}>Change Language</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Account Management</Text>
      <Button title="Logout" onPress={handleLogout} color="#FF3B30" />
      <Button title="Delete Account" onPress={handleDeleteAccount} color="#FF3B30" />

      <Text style={styles.subtitle}>Help & Support</Text>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Support')}>
        <Icon name="envelope" size={20} color="#4a90e2" />
        <Text style={styles.optionText}>Contact Support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FAQ')}>
        <Icon name="question-circle" size={20} color="#4a90e2" />
        <Text style={styles.optionText}>FAQ</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Legal</Text>
      <TouchableOpacity
        style={styles.option}
        onPress={() => openURL('https://crechespots.org.za/terms-and-conditions/')}
      >
        <Icon name="file-text" size={20} color="#4a90e2" />
        <Text style={styles.optionText}>Terms of Service</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.option}
        onPress={() => openURL('https://crechespots.org.za/privacy-policy/')}
      >
        <Icon name="file-text" size={20} color="#4a90e2" />
        <Text style={styles.optionText}>Privacy Policy</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Settings;
