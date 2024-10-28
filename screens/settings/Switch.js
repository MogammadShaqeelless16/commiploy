import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Picker, TouchableOpacity } from 'react-native';
import supabase from '../../supabaseClient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Switch = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchRoles();
  }, []);

  // Fetch current user information
  const fetchCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
      if (user && user.role_id) {
        setSelectedRole(user.role_id); // Set initial role selection based on current user role
      }
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
        .select('role_id, role_name');
      if (error) throw error;
      setRoles(data);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      Alert.alert('Error', 'Failed to fetch roles.');
    }
  };

  // Switch user role
  const switchRole = async () => {
    if (!currentUser || !selectedRole) {
      Alert.alert('Error', 'No user is currently logged in or no role selected.');
      return;
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({ role_id: selectedRole })
        .eq('id', currentUser.id);
      if (error) throw error;
      Alert.alert('Success', 'User role updated successfully.');
    } catch (error) {
      console.error('Failed to update role:', error);
      Alert.alert('Error', 'Failed to update role.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Switch User Role</Text>

      {currentUser && (
        <Text style={styles.info}>Current User: {currentUser.email}</Text>
      )}

      <Text style={styles.label}>Select Role:</Text>
      <Picker
        selectedValue={selectedRole}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedRole(itemValue)}
      >
        {roles.map((role) => (
          <Picker.Item key={role.role_id} label={role.role_name} value={role.role_id} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={switchRole}>
        <Icon name="swap-horiz" size={20} color="#fff" />
        <Text style={styles.buttonText}>Switch Role</Text>
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
    marginVertical: 10,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Switch;
