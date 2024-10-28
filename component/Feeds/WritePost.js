// WritePost.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For icons
import { useNavigation } from '@react-navigation/native'; // Hook for navigation

const WritePost = () => {
  const navigation = useNavigation(); // Get the navigation prop using the hook
  const [postText, setPostText] = useState('');

  // List of random placeholders
  const placeholders = [
    "Post a gig",
    "Need a handyman",
    "Someone to clean your car",
    "Garden cleaning",
    "Someone to walk your dog",
  ];

  // Randomly select a placeholder when the component mounts
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    setPlaceholder(placeholders[randomIndex]);
  }, []);

  const handlePost = () => {
    // Navigate to the Post a Gig page, passing the postText
    navigation.navigate('PostJob', { postText });
    setPostText(''); // Clear the input field after navigation (optional)
  };

  return (
    <View style={styles.postcontainer}>
      <View style={styles.inputContainer}>
        <Icon name="pencil" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder} // Use the random placeholder
          placeholderTextColor="#aaa"
          value={postText}
          onChangeText={setPostText}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post Gig</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postcontainer: {
    padding: '16',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    minHeight: 40,
  },
  postButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WritePost;
