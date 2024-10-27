import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker'; // Importing expo-document-picker
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importing vector icons

const DocumentUpload = ({ documents, setDocuments }) => {
  const handleDocumentUpload = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allow all file types
        copyToCacheDirectory: false, // Optional: set to false if you want to keep the original file path
      });
      
      if (result.type === 'success') {
        setDocuments((prev) => ({ ...prev, [type]: result }));
      }
    } catch (err) {
      console.error('Document Picker Error: ', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Document Uploads</Text>
      {['resume', 'idProof', 'addressProof'].map((docType) => (
        <View key={docType} style={styles.documentContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleDocumentUpload(docType)}
          >
            <Icon name="upload" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Upload {docType.charAt(0).toUpperCase() + docType.slice(1)}</Text>
          </TouchableOpacity>
          {documents[docType] && (
            <Text style={styles.uploadedText}>
              Uploaded {docType.charAt(0).toUpperCase() + docType.slice(1)}: {documents[docType].name}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    elevation: 3, // Add some shadow for Android
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007BFF',
  },
  documentContainer: {
    marginBottom: 15,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    elevation: 1,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  uploadedText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
});

export default DocumentUpload;
