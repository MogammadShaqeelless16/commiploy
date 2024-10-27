import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { decode } from 'html-entities';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Loading from '../component/loadingComponent/loading';

const News = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const WP_API_URL = 'https://www.plainsman.co.za/wp-json/wp/v2/posts';
  const navigation = useNavigation();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(WP_API_URL, {
        params: {
          _embed: true, // Ensure that embedded data is included
        }
      });
      const rawData = response.data;

      // Remove script tags and extract JSON data
      const jsonStr = rawData.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '').trim();
      const jsonStart = jsonStr.indexOf('[');
      const jsonEnd = jsonStr.lastIndexOf(']') + 1;

      // Extract and parse JSON data
      const jsonData = jsonStr.substring(jsonStart, jsonEnd);
      const posts = JSON.parse(jsonData);

      // Ensure posts is an array
      if (Array.isArray(posts)) {
        // Clean and process the data
        const cleanedPosts = posts.map(post => {
          // Remove unwanted HTML elements
          const cleanContent = post.content.rendered
            .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '') // Remove script tags
            .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
            .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '') // Remove style tags

          // Get featured image URL
          const imageUrl = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]
            ? post._embedded['wp:featuredmedia'][0].source_url
            : null;

          // Get author name
          const authorName = post._embedded && post._embedded['wp:author'] && post._embedded['wp:author'][0]
            ? post._embedded['wp:author'][0].name
            : 'Unknown';

          return {
            id: post.id.toString(),
            title: post.title.rendered,
            content: decode(cleanContent).replace(/<[^>]*>/g, ''), // Basic HTML tag removal
            author: authorName,
            imageUrl,
          };
        });

        // Update state with cleaned data
        setNewsArticles(cleanedPosts);
      } else {
        console.error('Unexpected data format:', posts);
        setError('Unexpected data format received from the API.');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to fetch news.');
    } finally {
      setLoading(false);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
      alert('AsyncStorage has been cleared.');
    } catch (error) {
      console.error('Failed to clear AsyncStorage:', error);
      alert('Failed to clear AsyncStorage.');
    }
  };

  const handlePress = (article) => {
    navigation.navigate('NewsDetails', { article });
  };

  const truncateContent = (content) => {
    const maxLength = 100; // Maximum length of the snippet
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + '...';
    }
    return content;
  };

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local News</Text>
      <FlatList
        data={newsArticles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder} />
            )}
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsAuthor}>By {item.author}</Text>
            <Text style={styles.newsContent}>{truncateContent(item.content)}</Text>
            <TouchableOpacity onPress={() => handlePress(item)} style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Read More</Text>
              <FontAwesome name="arrow-right" size={16} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  newsItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    paddingRight: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newsAuthor: {
    fontSize: 16,
    color: '#555',
  },
  newsContent: {
    fontSize: 16,
    color: '#555',
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
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  readMoreText: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
});

export default News;
