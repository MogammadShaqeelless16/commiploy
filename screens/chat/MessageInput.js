import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MessageInput = ({ messageText, onChangeText, onSend }) => {
  return (
    <View style={styles.footer}>
      <TextInput
        style={styles.input}
        value={messageText}
        onChangeText={onChangeText}
        placeholder="Type a message"
      />
      <TouchableOpacity onPress={onSend}>
        <Icon name="send-outline" size={24} color="#4a90e2" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default MessageInput;
