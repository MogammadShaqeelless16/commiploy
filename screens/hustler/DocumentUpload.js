import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const DocumentUpload = ({ documents, setDocuments }) => {
  const handleDocumentUpload = async (type) => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setDocuments(prev => ({ ...prev, [type]: result }));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the document picker');
      } else {
        console.error('Document Picker Error: ', err);
      }
    }
  };

  return (
    <View>
      <Text style={styles.header}>Document Uploads</Text>
      {['resume', 'idProof', 'addressProof'].map((docType) => (
        <View key={docType}>
          <Button title={`Upload ${docType.charAt(0).toUpperCase() + docType.slice(1)}`} onPress={() => handleDocumentUpload(docType)} />
          {documents[docType] && <Text>Uploaded {docType.charAt(0).toUpperCase() + docType.slice(1)}: {documents[docType].name}</Text>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default DocumentUpload;
