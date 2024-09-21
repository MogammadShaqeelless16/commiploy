import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddArticleButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => navigation.navigate('CreateArticle')}
    >
      <Text style={styles.addButtonText}>Add Article</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddArticleButton;
