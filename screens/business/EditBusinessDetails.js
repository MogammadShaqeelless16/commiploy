import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import supabase from '../../supabaseClient';
import { Picker } from '@react-native-picker/picker'; // Import Picker

const EditBusinessDetails = ({ route, navigation }) => {
  const { businessId, businessSlug } = route.params;

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
    template: 'template1',  // Added default template
    font: 'Arial',          // Added default font style
  });

  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility

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

  // Render Styling Step
  const renderStylingDetails = () => (
    <>
      <Text style={styles.title}>Edit Styling</Text>
      
      {/* Dropdown for selecting Website Template */}
      <Text style={styles.label}>Website Template</Text>
      <Picker
        selectedValue={editForm.template}
        style={styles.picker}
        onValueChange={(itemValue) => onChange('template', itemValue)}
      >
        <Picker.Item label="Template 1" value="template1" />
        <Picker.Item label="Template 2" value="template2" />
        <Picker.Item label="Template 3" value="template3" />
      </Picker>
  
      {/* Dropdown for selecting Font Style */}
      <Text style={styles.label}>Font Style</Text>
      <Picker
        selectedValue={editForm.font}
        style={styles.picker}
        onValueChange={(itemValue) => onChange('font', itemValue)}
      >
        <Picker.Item label="Arial" value="Arial" />
        <Picker.Item label="Times New Roman" value="Times New Roman" />
        <Picker.Item label="Courier New" value="Courier New" />
        <Picker.Item label="Verdana" value="Verdana" />
        <Picker.Item label="Georgia" value="Georgia" />
      </Picker>
    </>
  );
  // Open business website link
  const openWebsiteLink = () => {
    setIsModalVisible(true);
    window.open(`https://commibuy.netlify.app/business/${businessSlug}`, '_blank');
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${(currentStep / 4) * 100}%` }]} />
      </View>
      {currentStep === 1 && renderBasicDetails()}
      {currentStep === 2 && renderContactDetails()}
      {currentStep === 3 && renderLocationDetails()}
      {currentStep === 4 && renderStylingDetails()} {/* Render styling details */}

      <View style={styles.buttonContainer}>
        {currentStep === 1 && (
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        )}
        {currentStep > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentStep(currentStep - 1)}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        {currentStep < 4 && ( // Update condition for next button
          <TouchableOpacity style={styles.nextButton} onPress={() => setCurrentStep(currentStep + 1)}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
        {currentStep === 4 && ( // Show save and open website buttons at the last step
          <View style={styles.row}>
            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Overlay for modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Opening website...</Text>
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 20,
  },
  progress: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ff6666',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
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
    marginRight: 5,
  },
  websiteButton: {
    backgroundColor: '#007bff',
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
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default EditBusinessDetails;
