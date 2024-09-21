import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Ensure the correct import path

const FeedDetails = ({ route, navigation }) => {
  const { article } = route.params; // Get the article data from route params

  const handleDonate = async () => {
    // Implement donation logic here
    Alert.alert('Donation', 'Donation functionality is not implemented yet.');
  };

  const handleBookEvent = async () => {
    // Implement event booking logic here
    Alert.alert('Booking', 'Event booking functionality is not implemented yet.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#007bff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.date}>{new Date(article.created_at).toLocaleDateString()}</Text>
        </View>
      </View>
      <Text style={styles.content}>{article.content}</Text>
      <View style={styles.actionsContainer}>
        {article.type === 'Donation' && (
          <TouchableOpacity style={styles.actionButton} onPress={handleDonate}>
            <Icon name="hand-heart" size={24} color="#fff" />
            <Text style={styles.actionText}>Donate</Text>
          </TouchableOpacity>
        )}
        {article.type === 'Events' && (
          <TouchableOpacity style={styles.actionButton} onPress={handleBookEvent}>
            <Icon name="calendar-check" size={24} color="#fff" />
            <Text style={styles.actionText}>Book Event</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Adjusted padding
    paddingTop: 100,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Increased margin
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 12, // Increased padding
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4, // Added margin bottom
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  content: {
    fontSize: 16,
    color: '#444',
    marginBottom: 24, // Increased margin bottom
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 12, // Increased padding vertical
    paddingHorizontal: 24, // Increased padding horizontal
    borderRadius: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default FeedDetails;
