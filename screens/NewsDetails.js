import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const NewsDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { article } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  // Assuming content is split into an array of paragraphs
  const contentBlocks = article.content.split('\n').map((block, index) => ({ id: index.toString(), text: block }));

  const renderItem = ({ item }) => (
    <Text style={styles.content}>{item.text}</Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#007bff" />
        </TouchableOpacity>
        {article.imageUrl ? (
          <Image source={{ uri: article.imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.author}>By {article.author}</Text>
      </View>
      <FlatList
        data={contentBlocks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  content: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});

export default NewsDetails;
