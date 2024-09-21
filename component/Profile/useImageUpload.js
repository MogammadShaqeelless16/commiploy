import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import supabase from '../../supabaseClient'; // Ensure path is correct
import { fetchProfile } from '../UserOperations/fetchProfile';

export const useImageUpload = (updateProfile) => {
  const [uploading, setUploading] = useState(false);

  const getUserId = async () => {
    try {
      console.log('Fetching user session...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        console.error('Error fetching user session:', sessionError);
        return null;
      }
      console.log('User session fetched:', session);
      return session.user.id;
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    try {
      const userId = await getUserId();
      if (!userId) throw new Error('User not authenticated');

      // Fetch the current profile to get the current profile picture URL
      const profile = await fetchProfile();
      const currentProfilePicture = profile?.profile_picture_url || '';

      // Generate a unique filename with timestamp and user ID
      const timestamp = new Date().toISOString();
      const fileName = `${userId}_${timestamp}.jpg`;

      // Convert image URI to a Blob if on the web
      const file = Platform.OS === 'web' ? await fetch(uri).then(r => r.blob()) : uri;

      // Log the file and filename
      console.log('Uploading file:', file);
      console.log('File name:', fileName);

      // Upload the image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(`profile-pictures/${fileName}`, file);

      if (uploadError) {
        if (uploadError.message.includes('Duplicate')) {
          // Handle duplicate error if it occurs
          console.warn('File already exists. Handling duplication...');
          // Optionally, you can rename the file or delete the old one
          // For example, append a counter to the filename
          // Handle any necessary cleanup
        }
        console.error('Error uploading image:', uploadError);
        throw uploadError;
      }

      // Construct the public URL of the uploaded image
      const publicURL = `https://bqydopqekazcedqvpxzo.supabase.co/storage/v1/object/public/profile-pictures/profile-pictures/${fileName}`;
      console.log('Public URL:', publicURL);

      // Optionally delete the previous image if one exists
      if (currentProfilePicture) {
        // Extract file name from URL
        const previousFileName = currentProfilePicture.split('/').pop(); 
        console.log('Deleting previous file:', previousFileName);

        // Ensure the file path matches the one used during upload
        const { error: deleteError } = await supabase.storage
          .from('profile-pictures')
          .remove([`profile-pictures/${previousFileName}`]);

        if (deleteError) throw deleteError;
      }

      // Update the profile with the new picture URL
      await updateProfile({ profile_picture_url: publicURL });
      Alert.alert('Success', 'Profile picture updated!');
    } catch (err) {
      console.error('Error in uploadImage:', err);
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setUploading(false);
    }
  };

  const handleImagePicker = async () => {
    if (Platform.OS === 'web') {
      document.getElementById('file-input').click();
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        console.log('Picked image URI:', result.uri);
        await uploadImage(result.uri);
      }
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const fileUrl = URL.createObjectURL(file);
      console.log('Selected file URL:', fileUrl);
      await uploadImage(fileUrl);
    } else {
      Alert.alert('Error', 'Please select a valid image file.');
    }
  };

  return { handleImagePicker, handleFileChange, uploading };
};
