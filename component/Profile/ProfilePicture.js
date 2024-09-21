import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Modal, Text, StyleSheet, Platform, Button, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useProfile } from './useProfile'; // Ensure path is correct
import { useImageUpload } from './useImageUpload'; // Ensure path is correct
import { fetchProfile } from '../UserOperations/fetchProfile';

const ProfilePicture = () => {
  const { profile, loading, error, updateProfile } = useProfile();
  const [modalVisible, setModalVisible] = useState(false);
  const { handleImagePicker, handleFileChange, uploading } = useImageUpload(updateProfile, profile?.profile_picture_url);

  const profilePictureURL = profile?.profile_picture_url || '';

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', 'An error occurred while fetching profile data.');
      console.error('Profile Error:', error);
    }
  }, [error]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity onPress={openModal}>
        {profilePictureURL ? (
          <Image
            source={{ uri: profilePictureURL }}
            style={styles.profilePicture}
            resizeMode="cover"
          />
        ) : (
            <text>test</text>
        )}
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {profilePictureURL ? (
              <Image
                source={{ uri: profilePictureURL }}
                style={styles.enlargedProfilePicture}
                resizeMode="cover"
              />
            ) : (
              <text>test</text>
            )}
            <Button
              title="Change Profile Picture"
              onPress={handleImagePicker}
              disabled={uploading}
            />
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                closeModal();
                // Perform additional edit actions if needed
              }}
            >
              <Text style={styles.editButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {Platform.OS === 'web' && (
        <input
          id="file-input"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    alignSelf: 'center',
  },
  enlargedProfilePicture: {
    width: Platform.OS === 'web' ? 300 : '50%',
    height: Platform.OS === 'web' ? 400 : 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfilePicture;
