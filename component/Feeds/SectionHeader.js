import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Ensure you have FontAwesome installed

const SectionHeader = ({ title, navigation, navigateTo, iconName }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity 
      style={styles.seeMoreButton} 
      onPress={() => navigation.navigate(navigateTo)}
    >
      <Text style={styles.seeMoreText}>See More</Text>
      {iconName && <FontAwesome name={iconName} size={20} color="#fff" style={styles.icon} />}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f6bc1c',
    borderRadius: 5,
  },
  seeMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5, // Space between text and icon
  },
  icon: {
    marginLeft: 5, // Optional space between text and icon
  },
});

export default SectionHeader;
