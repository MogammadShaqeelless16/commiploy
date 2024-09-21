import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillEditor = ({ content, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: true,
        },
        placeholder: 'Compose an epic...',
      });

      quill.on('text-change', () => {
        onChange(quill.root.innerHTML);
      });

      quill.root.innerHTML = content;
    }
  }, [content, onChange]);

  return (
    <View style={styles.editorContainer}>
      <div ref={editorRef} style={styles.editor} />
    </View>
  );
};

const styles = StyleSheet.create({
  editorContainer: {
    flex: 1,
  },
  editor: {
    height: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default QuillEditor;
