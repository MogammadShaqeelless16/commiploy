import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For icons, like a "pencil" icon for the input

const WritePost = ({ onPost }) => {
  const [postText, setPostText] = useState('');

  const handlePost = () => {
    if (postText.trim()) {
      onPost(postText); // Callback function to handle the post submission
      setPostText(''); // Clear the input field after posting
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="pencil" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Find a Hustler? / Post a Gig?"
          placeholderTextColor="#aaa"
          value={postText}
          onChangeText={setPostText}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
