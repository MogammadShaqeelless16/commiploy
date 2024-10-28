import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import HTMLView from 'react-native-htmlview'; // Import HTMLView for basic HTML rendering
import QuillEditor from '../QuillEditor'; // Ensure QuillEditor is properly implemented

const ArticleModal = ({ 
  visible, 
  onClose, 
  article, 
  editorContent, 
  setEditorContent, 
  newArticleTitle, 
  setNewArticleTitle, 
  onSave, 
  onDelete, 
  userRole 
}) => {
  const sanitizedContent = article ? article.content.replace(/<script[^>]*>.*?<\/script>/gi, '') : '';

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        {userRole === 'Administrator' || userRole === 'Developer' ? (
          <>
            <TextInput
              style={styles.titleInput}
              placeholder="Title"
              value={newArticleTitle}
              onChangeText={setNewArticleTitle}
            />
            <QuillEditor content={editorContent} onChange={setEditorContent} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                <Text style={styles.saveButtonText}>{article ? 'Save Changes' : 'Add Article'}</Text>
              </TouchableOpacity>
              {article && (
                <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <ScrollView>
            <Text style={styles.titleText}>{article?.title}</Text>
            <HTMLView value={sanitizedContent} stylesheet={htmlStyles} />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titleInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

// Define custom styles for the HTMLView
const htmlStyles = StyleSheet.create({
  p: { fontSize: 16, lineHeight: 24 },
  h1: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  h2: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  a: { color: '#007bff', textDecorationLine: 'underline' },
});

export default ArticleModal;
