import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types'; // Import PropTypes for type checking

const ProfileForm = ({ profile, onChange }) => {
  // Default to an empty object if profile is null or undefined
  const safeProfile = profile || {};

  return (
    <>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#4a90e2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Display Name"
          value={safeProfile.display_name || ''}
          onChangeText={(text) => onChange('display_name', text)}
          accessibilityLabel="Display Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#4a90e2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={safeProfile.first_name || ''}
          onChangeText={(text) => onChange('first_name', text)}
          accessibilityLabel="First Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#4a90e2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={safeProfile.last_name || ''}
          onChangeText={(text) => onChange('last_name', text)}
          accessibilityLabel="Last Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#4a90e2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={safeProfile.phone_number || ''}
          onChangeText={(text) => onChange('phone_number', text)}
          accessibilityLabel="Phone Number"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="id-card" size={20} color="#4a90e2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="ID Number"
          value={safeProfile.id_number || ''}
          onChangeText={(text) => onChange('id_number', text)}
          accessibilityLabel="ID Number"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="info-circle" size={20} color="#4a90e2" style={styles.icon} />
        <TextInput
          style={styles.bioInput}
          placeholder="Bio"
          value={safeProfile.bio || ''}
          onChangeText={(text) => onChange('bio', text)}
          multiline
          accessibilityLabel="Bio"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#4a90e2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={safeProfile.email || ''}
          editable={false}
          accessibilityLabel="Email"
        />
      </View>
    </>
  );
};

// PropTypes validation
ProfileForm.propTypes = {
  profile: PropTypes.shape({
    display_name: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    phone_number: PropTypes.string,
    id_number: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  bioInput: {
    flex: 1,
    height: 100,
    paddingHorizontal: 10,
    borderRadius: 4,
    textAlignVertical: 'top',
  },
  icon: {
    marginRight: 10,
  },
});

export default ProfileForm;
