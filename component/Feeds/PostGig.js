import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import supabase from '../../supabaseClient'; // Make sure to import your supabase client

const PostGig = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState('');

  const handlePostGig = async () => {
    if (!title || !description || !date || !time || !location) {
      Alert.alert('Missing Fields', 'Please fill out all required fields.');
      return;
    }

    try {
      const { error } = await supabase
        .from('jobs') // Make sure 'gigs' table exists in your Supabase database
        .insert([
          {
            title,
            description,
            date,
            time,
            location,
            requirements,
          },
        ]);

      if (error) {
        console.error('Error posting gig:', error.message);
        Alert.alert('Error', 'Failed to post the gig. Please try again.');
      } else {
        Alert.alert('Success', 'Your gig has been posted!');
        // Optionally navigate to another screen or reset fields
        navigation.goBack(); // Go back to the previous screen after posting
      }
    } catch (error) {
      console.error('Error in handlePostGig:', error.message);
      Alert.alert('Error', 'Failed to post the gig. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post a Gig</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Gig Title"
        value={title}
        onChangeText={setTitle}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM)"
        value={time}
        onChangeText={setTime}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Requirements (optional)"
        value={requirements}
        onChangeText={setRequirements}
        multiline
        numberOfLines={3}
      />
      
      <TouchableOpacity style={styles.postButton} onPress={handlePostGig}>
        <Text style={styles.postButtonText}>Post Gig</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  postButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PostGig;
