import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Animated, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import
import supabase from '../supabaseClient'; // Adjust the path if necessary
import { fetchProfile } from '../component/UserOperations/fetchProfile';

const Support = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Support');
  const [message, setMessage] = useState('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  const slideAnim = useState(new Animated.Value(-100))[0]; // Initial position of the notification

  const handleSubmit = async () => {
    if (!title || !message) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    try {
      console.log('Fetching user profile...');
      const profile = await fetchProfile();
      console.log('Fetched user profile:', profile);

      if (profile) {
        console.log('Submitting support request...');
        const { error } = await supabase
          .from('support_requests')
          .insert([{ user_id: profile.id, title, category, message }]);

        if (error) {
          console.error('Error inserting support request:', error);
          throw error;
        }

        // Show success notification
        setNotificationMessage('Your support request has been submitted');
        setIsNotificationVisible(true);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
        
        // Hide notification after 3 seconds
        setTimeout(() => {
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setIsNotificationVisible(false);
          });
        }, 3000);

        setTitle('');
        setCategory('Support');
        setMessage('');
      } else {
        Alert.alert('Error', 'You must be logged in to submit a support request');
      }
    } catch (error) {
      console.error('Error handling support request:', error);
      Alert.alert('Error', error.message || 'An error occurred while submitting your request');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Do you have a problem? Let us help!</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Category</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Support" value="Support" />
          <Picker.Item label="Finance" value="Finance" />
          <Picker.Item label="Complaints" value="Complaints" />
          <Picker.Item label="Become a Driver" value="Become a Driver" />
          <Picker.Item label="List Your Creche" value="List Your Creche" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Describe your issue"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />

      <Button title="Submit" onPress={handleSubmit} />

      {isNotificationVisible && (
        <Animated.View style={[styles.notification, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.notificationText}>{notificationMessage}</Text>
        </Animated.View>
      )}
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  notification: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: '#fff',
    fontSize: 16,
  },
});
