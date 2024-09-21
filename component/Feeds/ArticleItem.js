import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Ensure correct import path

const getTypeColor = (type) => {
  switch (type) {
    case 'Events':
      return '#ffdddd'; // Light red for Events
    case 'Helpful':
      return '#d0f0c0'; // Light green for Helpful
    case 'Donation':
      return '#d0e0ff'; // Light blue for Donation
    default:
      return '#ffffff'; // Default background color
  }
};

const ArticleItem = ({ article, isHearted, onHeart }) => {
  const typeColor = getTypeColor(article.type);

  return (
    <View style={[styles.article, { backgroundColor: typeColor }]}>
      <Text style={styles.articleTitle}>{article.title}</Text>
      <Text style={styles.articleAuthor}>By {article.author.display_name}</Text>
      <Text style={styles.articleContent}>{article.content}</Text>
      <Text style={styles.articleType}>{article.type}</Text>
      <View style={styles.heartContainer}>
        <TouchableOpacity style={styles.heartButton} onPress={onHeart}>
          <Icon
            name={isHearted ? 'heart' : 'heart-outline'}
            size={24}
            color={isHearted ? 'red' : '#000'}
          />
        </TouchableOpacity>
        <Text style={styles.heartCount}>{article.hearts || 0}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  article: {
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
    marginHorizontal: 12,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4, // Adjusted margin to fit author text
  },
  articleAuthor: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 8,
  },
  articleContent: {
    fontSize: 16,
    color: '#666666',
    marginVertical: 4,
  },
  articleType: {
    fontSize: 14,
    color: '#ffffff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 4,
  },
  heartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  heartButton: {
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  heartCount: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 8,
  },
});

export default ArticleItem;
