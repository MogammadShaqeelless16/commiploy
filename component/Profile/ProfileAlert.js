import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileAlert = ({ navigation, onClose }) => {
  return (
    <View style={styles.profileAlert}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
        <Icon name="times" size={20} color="#fff" />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.alertText}>
          You are not signed in. Please create an account or log in.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Login');
            onClose(); // Close alert after navigating
          }}
          activeOpacity={0.7}
        >
          <Icon name="sign-in" size={20} color="#fff" />
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('SignUp');
            onClose(); // Close alert after navigating
          }}
          activeOpacity={0.7}
        >
          <Icon name="user-plus" size={20} color="#fff" />
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileAlert: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    margin: 10,
    position: 'relative',
  },
  textContainer: {
    marginBottom: 10,
  },
  alertText: {
    color: '#fff',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});

export default ProfileAlert;
