import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import supabase from '../supabaseClient'; // Ensure the correct import path

const EditArticle = ({ route, navigation }) => {
  const { articleId } = route.params;
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('Helpful');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId)
        .single();

      if (error) {
        Alert.alert('Error', 'Error fetching article data');
        console.error('Article Fetch Error:', error);
        setLoading(false);
        return;
      }

      setArticle(data);
      setTitle(data.title);
      setContent(data.content);
      setType(data.type);
      setLoading(false);
    };

    fetchArticle();
  }, [articleId]);

  const handleUpdateArticle = async () => {
    if (!title || !content) {
      Alert.alert('Error', 'Title and content are required.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('articles')
        .update({ title, content, type })
        .eq('id', articleId);

      if (error) {
        throw error;
      }

      Alert.alert('Success', 'Article updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Error updating article');
      console.error('Article Update Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Article</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Type (e.g., Helpful, Events, Donation)"
        value={type}
        onChangeText={setType}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateArticle} disabled={loading}>
        <Text style={styles.buttonText}>Update Article</Text>
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

export default EditArticle;
