// components/ArticleList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ArticleList = ({ articles, onArticleClick }) => (
  <FlatList
    data={articles}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <TouchableOpacity style={styles.articleCard} onPress={() => onArticleClick(item)}>
        <Text style={styles.articleTitle}>{item.title}</Text>
      </TouchableOpacity>
    )}
    ListEmptyComponent={<Text style={styles.emptyText}>No articles found.</Text>}
  />
);

const styles = StyleSheet.create({
  articleCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  articleTitle: {
    fontSize: 18,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default ArticleList;
