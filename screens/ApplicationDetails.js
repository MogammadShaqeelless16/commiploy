import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import supabase from '../supabaseClient'; // Ensure the correct import path
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../component/loadingComponent/loading';

const ApplicationDetails = () => {
  const [application, setApplication] = useState(null);
  const [creche, setCreche] = useState(null);
  const [error, setError] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  
  // Get the applicationId from the route params
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
      } catch (error) {
        setError(error.message);
        console.error('Error fetching application details:', error.message);
      }
    };

    fetchApplicationDetails();
  }, [applicationId]);

  const handleEdit = () => {
    // Navigate to an edit screen
    navigation.navigate('EditApplication', { applicationId });
  };

  if (error) {
    return <View style={styles.container}><Text style={styles.errorText}>Error: {error}</Text></View>;
  }

  if (!application || !creche) {
    return <Loading />;
  }

  const canEdit = application.application_status === 'New';

  // Array of data to be displayed in the FlatList
  const data = [
    { id: '1', label: 'Creche', value: creche.name, icon: 'school' },
    { id: '3', label: 'Phone', value: creche.phone_number, icon: 'call-outline' },
    { id: '5', label: 'Message', value: application.message, icon: 'chatbubble-outline' },
    { id: '9', label: 'Status', value: application.application_status, icon: 'checkmark-circle-outline' },
    { id: '10', label: 'Submitted At', value: new Date(application.submitted_at).toLocaleDateString(), icon: 'calendar-outline' },
    { id: '13', label: 'Number of Children', value: application.number_of_children, icon: 'people-outline' },
  ];

  // Render item for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.infoRow}>
      <Icon name={item.icon} size={24} color="#4a90e2" />
      <View style={styles.infoTextContainer}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.header}>Application Details</Text>
        {canEdit && (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Icon name="create-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        contentContainerStyle={styles.scrollContainer}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a90e2',
    padding: 16,
    elevation: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  editButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 25,
    padding: 12,
  },
  backButton: {
    marginRight: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    elevation: 2,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ApplicationDetails;
