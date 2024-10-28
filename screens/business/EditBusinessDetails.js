import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import supabase from '../../supabaseClient';

const EditBusinessDetails = ({ route, navigation }) => {
  const { businessId } = route.params;
  
  // Form state for editing business details
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    address: '',
    header_image: '',
    logo_url: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    email: '',
    longitude: '',
    latitude: '',
    slogan: '',
    template: 'template1',
    font: 'Arial',
  });

  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // Track the current step

  // Fetch business details to populate form
  const fetchBusinessDetails = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', businessId)
        .single();

      if (error) {
        throw new Error('Error fetching business details');
      }

      setEditForm(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (name, value) => {
    setEditForm({ ...editForm, [name]: value });
  };

  const onSave = async () => {
    try {
      const { error } = await supabase
        .from('businesses')
        .update(editForm)
        .eq('id', businessId);

      if (error) throw new Error('Error updating business details');
      Alert.alert('Success', 'Business details updated successfully.');
      navigation.goBack(); // Navigate back after saving
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    fetchBusinessDetails();
  }, [businessId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Render Basic Details Step
  const renderBasicDetails = () => (
    <>
      <Text style={styles.title}>Edit Basic Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={editForm.name}
        onChangeText={(text) => onChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={editForm.description}
        onChangeText={(text) => onChange('description', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={editForm.address}
        onChangeText={(text) => onChange('address', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Header Image URL"
        value={editForm.header_image}
        onChangeText={(text) => onChange('header_image', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Logo URL"
        value={editForm.logo_url}
        onChangeText={(text) => onChange('logo_url', text)}
      />
    </>
  );

  // Render Contact Details Step
  const renderContactDetails = () => (
    <>
      <Text style={styles.title}>Edit Contact Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={editForm.email}
        onChangeText={(text) => onChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Facebook URL"
        value={editForm.facebook}
        onChangeText={(text) => onChange('facebook', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Instagram URL"
        value={editForm.instagram}
        onChangeText={(text) => onChange('instagram', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Twitter URL"
        value={editForm.twitter}
        onChangeText={(text) => onChange('twitter', text)}
      />
    </>
  );

  // Render Location Step
  const renderLocationDetails = () => (
    <>
      <Text style={styles.title}>Edit Location Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        value={editForm.longitude}
        onChangeText={(text) => onChange('longitude', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        value={editForm.latitude}
        onChangeText={(text) => onChange('latitude', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Slogan"
        value={editForm.slogan}
        onChangeText={(text) => onChange('slogan', text)}
      />
    </>
  );

  return (
    <View style={styles.container}>
      {currentStep === 1 && renderBasicDetails()}
      {currentStep === 2 && renderContactDetails()}
      {currentStep === 3 && renderLocationDetails()}

      <View style={styles.buttonContainer}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentStep(currentStep - 1)}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        {currentStep < 3 && (
          <TouchableOpacity style={styles.nextButton} onPress={() => setCurrentStep(currentStep + 1)}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
        {currentStep === 3 && (
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditBusinessDetails;
