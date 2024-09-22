import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust based on your chosen icon library

const ProfileAlert = ({ navigation }) => {
  return (
    <View style={styles.profileAlert}>
      <Text style={styles.alertText}>
        You are not signed in. Please create an account or log in.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
        >
          <Icon name="sign-in" size={20} color="#fff" />
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
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
  },
  alertText: {
    color: '#fff',
    marginBottom: 10,
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
});

export default ProfileAlert;
