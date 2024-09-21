import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Picker, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../../supabaseClient';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons

const DeveloperScreen = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    fetchCurrentUser();
    fetchRoles();
  }, []);

  // Fetch current user
  const fetchCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Failed to retrieve user:', error);
      Alert.alert('Error', 'Failed to retrieve user.');
    }
  };

  // Fetch roles from the database
  const fetchRoles = async () => {
    try {
      const { data, error } = await supabase
        .from('roles')
        .select('role_name');

      if (error) {
        throw error;
      }

      setRoles(data.map(role => role.role_name));
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      Alert.alert('Error', 'Failed to fetch roles.');
    }
  };

  // Switch user role
  const switchRole = async () => {
    if (!currentUser) {
      Alert.alert('Error', 'No user is currently logged in.');
      return;
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({ role: selectedRole })
        .eq('id', currentUser.id);

      if (error) {
        throw error;
      }

      Alert.alert('Success', `User role updated to ${selectedRole}.`);
    } catch (error) {
      console.error('Failed to update role:', error);
      Alert.alert('Error', 'Failed to update role.');
    }
  };

  // Clear AsyncStorage
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Success', 'AsyncStorage cleared.');
    } catch (error) {
      console.error('Failed to clear AsyncStorage:', error);
      Alert.alert('Error', 'Failed to clear AsyncStorage.');
    }
  };

  // Fetch logs (Placeholder function)
  const fetchLogs = async () => {
    try {
      Alert.alert('Logs', 'Fetch logs functionality not implemented.');
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      Alert.alert('Error', 'Failed to fetch logs.');
    }
  };

  // Reset app (Placeholder function)
  const resetApp = async () => {
    try {
      Alert.alert('Reset', 'Reset app functionality not implemented.');
    } catch (error) {
      console.error('Failed to reset app:', error);
      Alert.alert('Error', 'Failed to reset app.');
    }
  };

  // Inspect API (Placeholder function)
  const inspectAPI = async () => {
    try {
      Alert.alert('API Inspection', 'Inspect API functionality not implemented.');
    } catch (error) {
      console.error('Failed to inspect API:', error);
      Alert.alert('Error', 'Failed to inspect API.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Developer Functions</Text>

      {currentUser && (
        <>
          <Text style={styles.info}>Current User: {currentUser.email}</Text>
          <Text style={styles.info}>Current Role: {currentUser.role || 'N/A'}</Text>
        </>
      )}

      <Text style={styles.label}>Select Role:</Text>
      <Picker
        selectedValue={selectedRole}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedRole(itemValue)}
      >
        {roles.map((role, index) => (
          <Picker.Item key={index} label={role} value={role} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={switchRole}>
        <Icon name="swap-horiz" size={20} color="#fff" />
        <Text style={styles.buttonText}>Switch Role</Text>
      </TouchableOpacity>

      {/* Additional Developer Functions */}
      <TouchableOpacity style={styles.button} onPress={clearStorage}>
        <Icon name="delete" size={20} color="#fff" />
        <Text style={styles.buttonText}>Clear AsyncStorage</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={fetchLogs}>
        <Icon name="error" size={20} color="#fff" />
        <Text style={styles.buttonText}>Fetch Logs</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={resetApp}>
        <Icon name="refresh" size={20} color="#fff" />
        <Text style={styles.buttonText}>Reset App</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={inspectAPI}>
        <Icon name="api" size={20} color="#fff" />
        <Text style={styles.buttonText}>Inspect API</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default DeveloperScreen;
