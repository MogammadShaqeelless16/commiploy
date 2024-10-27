import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillEditor = ({ content, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null); // Ref to store the Quill instance

  useEffect(() => {
    // Initialize Quill editor only once when component mounts
    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: true,
      },
      placeholder: 'Compose an epic...',
    });

    // Set initial content
    quillRef.current.root.innerHTML = content;

    // Set up the onChange handler
    const handleTextChange = () => {
      onChange(quillRef.current.root.innerHTML);
    };

    quillRef.current.on('text-change', handleTextChange);

    // Cleanup function to remove event listener and Quill instance
    return () => {
      quillRef.current.off('text-change', handleTextChange);
      quillRef.current = null; // Clear reference
    };
  }, []); // Empty dependency array to run this effect only once

  // Update Quill content when `content` prop changes
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.root.innerHTML = content;
    }
  }, [content]);

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
