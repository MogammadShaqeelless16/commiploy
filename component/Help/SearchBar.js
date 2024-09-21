// components/SearchBar.js
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ searchTerm, onSearchChange, showAddForm, onAddButtonPress, userRole }) => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search help articles..."
      value={searchTerm}
      onChangeText={onSearchChange}
    />
    {(userRole === 'Administrator' || userRole === 'Developer') && (
      <TouchableOpacity
        style={styles.addButton}
        onPress={onAddButtonPress}
      >
        <Ionicons name={showAddForm ? 'close' : 'add'} size={24} color="white" />
        <Text style={styles.addButtonText}>{showAddForm ? 'Cancel' : 'Add Article'}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 4,
  },
});

export default SearchBar;
