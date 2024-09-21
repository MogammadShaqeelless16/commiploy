import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import supabase from '../supabaseClient'; // Ensure the correct import path
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../component/loadingComponent/loading';

const EditApplication = () => {
  const [application, setApplication] = useState(null);
  const [creche, setCreche] = useState(null);
  const [error, setError] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const route = useRoute();
  const navigation = useNavigation();

  const { applicationId } = route.params;

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        if (!applicationId) {
          throw new Error('Application ID is missing.');
        }

        // Fetch application details
        const { data: appData, error: appError } = await supabase
          .from('applications')
          .select('id, creche_id, source, message, parent_name, parent_phone_number, parent_email, application_status, submitted_at, parent_whatsapp, created_at, number_of_children, parent_address')
          .eq('id', applicationId)
          .single();

        if (appError) {
          throw appError;
        }

        if (!appData) {
          throw new Error('Application not found.');
        }

        setApplication(appData);

        // Fetch creche details
        const { data: crecheData, error: crecheError } = await supabase
          .from('creches')
          .select('id, name, address, phone_number')
          .eq('id', appData.creche_id)
          .single();

        if (crecheError) {
          throw crecheError;
        }

        setCreche(crecheData);
        // Initialize editable fields
        setEditableFields({
          message: appData.message || '',
          parent_name: appData.parent_name || '',
          parent_phone_number: appData.parent_phone_number || '',
          parent_email: appData.parent_email || '',
          parent_whatsapp: appData.parent_whatsapp || '',
          number_of_children: appData.number_of_children ? appData.number_of_children.toString() : '',
          parent_address: appData.parent_address || '',
        });
      } catch (error) {
        setError(error.message);
        console.error('Error fetching application details:', error.message);
      }
    };

    fetchApplicationDetails();
  }, [applicationId]);

  const handleSave = async () => {
    try {
      // Convert number_of_children back to integer for storage
      const updatedFields = {
        ...editableFields,
        number_of_children: editableFields.number_of_children ? parseInt(editableFields.number_of_children, 10) : null,
      };

      const { error: updateError } = await supabase
        .from('applications')
        .update(updatedFields)
        .eq('id', applicationId);

      if (updateError) {
        throw updateError;
      }

      Alert.alert('Success', 'Application updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (error) {
    return <View style={styles.container}><Text style={styles.errorText}>Error: {error}</Text></View>;
  }

  if (!application || !creche) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Edit Application</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="school-outline" size={24} color="#333" />
            <Text style={styles.label}>Creche: </Text>
            <Text style={styles.value}>{creche.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="call-outline" size={24} color="#333" />
            <Text style={styles.label}>Phone: </Text>
            <Text style={styles.value}>{creche.phone_number}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Icon name="chatbubble-outline" size={24} color="#333" />
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={styles.input}
              value={editableFields.message}
              onChangeText={(text) => setEditableFields({ ...editableFields, message: text })}
              placeholder="Message"
            />
          </View>
          <View style={styles.fieldContainer}>
            <Icon name="person-outline" size={24} color="#333" />
            <Text style={styles.label}>Parent Name: </Text>
            <TextInput
              style={styles.input}
              value={editableFields.parent_name}
              onChangeText={(text) => setEditableFields({ ...editableFields, parent_name: text })}
              placeholder="Parent Name"
            />
          </View>
          <View style={styles.fieldContainer}>
            <Icon name="call-outline" size={24} color="#333" />
            <Text style={styles.label}>Parent Phone Number: </Text>
            <TextInput
              style={styles.input}
              value={editableFields.parent_phone_number}
              onChangeText={(text) => setEditableFields({ ...editableFields, parent_phone_number: text })}
              placeholder="Parent Phone Number"
            />
          </View>
          <View style={styles.fieldContainer}>
            <Icon name="mail-outline" size={24} color="#333" />
            <Text style={styles.label}>Parent Email: </Text>
            <TextInput
              style={styles.input}
              value={editableFields.parent_email}
              onChangeText={(text) => setEditableFields({ ...editableFields, parent_email: text })}
              placeholder="Parent Email"
            />
          </View>
          <View style={styles.fieldContainer}>
            <Icon name="logo-whatsapp" size={24} color="#33b750" />
            <Text style={styles.label}>Parent WhatsApp: </Text>
            <TextInput
              style={styles.input}
              value={editableFields.parent_whatsapp}
              onChangeText={(text) => setEditableFields({ ...editableFields, parent_whatsapp: text })}
              placeholder="Parent WhatsApp"
            />
          </View>
          <View style={styles.fieldContainer}>
            <Icon name="people-outline" size={24} color="#333" />
            <Text style={styles.label}>Number of Children: </Text>
            <TextInput
              style={styles.input}
              value={editableFields.number_of_children}
              onChangeText={(text) => setEditableFields({ ...editableFields, number_of_children: text })}
              placeholder="Number of Children"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.fieldContainer}>
            <Icon name="home-outline" size={24} color="#333" />
            <Text style={styles.label}>Parent Address</Text>
            <TextInput
              style={styles.input}
              value={editableFields.parent_address}
              onChangeText={(text) => setEditableFields({ ...editableFields, parent_address: text })}
              placeholder="Parent Address"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Save Changes" onPress={handleSave} color="#4a90e2" />
        </View>
      </ScrollView>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 80, // Space for fixed button
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 32,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    elevation: 3,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginLeft: 8,
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    marginTop: 20,
  },
  backButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 25,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EditApplication;
