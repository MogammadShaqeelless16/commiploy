import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import supabase from '../../supabaseClient'; // Ensure the correct import path

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('Helpful');
  const [loading, setLoading] = useState(false);

  const handleCreateArticle = async () => {
    if (!title || !content) {
      Alert.alert('Error', 'Title and content are required.');
      return;
    }

    setLoading(true);

    // Fetch current location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Error', 'Location permission is required.');
      setLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Fetch user ID from session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      Alert.alert('Error', 'Unable to fetch user session');
      setLoading(false);
      return;
    }
    const userId = session.user.id;

    try {
      const { error } = await supabase
        .from('articles')
        .insert([
          {
            title,
            content,
            type,
            location: `POINT(${longitude} ${latitude})`,
            author_id: userId, // Use the actual user ID
          },
        ]);

      if (error) {
        throw error;
      }

      Alert.alert('Success', 'Article created successfully!');
      setTitle('');
      setContent('');
      setType('Helpful');
    } catch (error) {
      Alert.alert('Error', 'Error creating article');
      console.error('Article Creation Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Article</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Type</Text>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Helpful" value="Helpful" />
          <Picker.Item label="Events" value="Events" />
          <Picker.Item label="Donation" value="Donation" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCreateArticle} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Create Article</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    marginBottom: 12,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  picker: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CreateArticle;
