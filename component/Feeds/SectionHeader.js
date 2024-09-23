import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SectionHeader = ({ title, navigation, navigateTo }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity 
      style={styles.seeMoreButton} 
      onPress={() => navigation.navigate(navigateTo)} // Navigate on press
    >
      <Text style={styles.seeMoreText}>See More</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeMoreButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  seeMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SectionHeader;
