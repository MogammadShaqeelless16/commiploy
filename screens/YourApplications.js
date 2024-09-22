import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import supabase from '../supabaseClient'; // Ensure the correct import path
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Ensure correct import path

const YourApplications = () => {
  const [applications, setApplications] = useState([]);
  const [creches, setCreches] = useState({});
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [noApplicationsFound, setNoApplicationsFound] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control
  const navigation = useNavigation();

  const fetchUserAndApplications = useCallback(async () => {
    setRefreshing(true); // Set refreshing to true when starting the fetch
    try {
      // Fetch the current user
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user || !user.user.id) {
        throw new Error('Failed to get user.');
      }

      // Fetch user details from the users table
      const { data: userDetailsData, error: userDetailsError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.user.id)
        .single(); // Assuming `id` is the primary key and you're fetching a single record

      if (userDetailsError) {
        throw userDetailsError;
      }
      setUserDetails(userDetailsData);

      // Fetch applications
      const { data: applicationsData, error: appsError } = await supabase
        .from('applications')
        .select('id, creche_id, application_status, created_at')
        .eq('user_id', user.user.id);

      if (appsError) {
        throw appsError;
      }

      if (applicationsData.length === 0) {
        setNoApplicationsFound(true);
      } else {
        setNoApplicationsFound(false);
        setApplications(applicationsData);

        // Fetch creches
        const crecheIds = applicationsData.map(app => app.creche_id).filter(id => id); // Filter out any undefined values
        const { data: crechesData, error: crechesError } = await supabase
          .from('creches')
          .select('id, name, address')
          .in('id', crecheIds);

        if (crechesError) {
          throw crechesError;
        }

        const crecheMap = crechesData.reduce((map, creche) => {
          map[creche.id] = creche;
          return map;
        }, {});
        setCreches(crecheMap);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setRefreshing(false); // Set refreshing to false when the fetch is complete
    }
  }, []);

  useEffect(() => {
    fetchUserAndApplications();
  }, [fetchUserAndApplications]);

  const handleSelectApplication = (applicationId) => {
    navigation.navigate('ApplicationDetails', { applicationId });
  };

  const handleDeleteApplication = async (applicationId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this application?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const { error: deleteError } = await supabase
                .from('applications')
                .delete()
                .eq('id', applicationId);

              if (deleteError) {
                throw deleteError;
              }

              Alert.alert('Success', 'Application deleted successfully');
              fetchUserAndApplications(); // Refresh the list after deletion
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  if (error) {
    return <View style={styles.container}><Text>Error: {error}</Text></View>;
  }

  if (noApplicationsFound) {
    return (
      <View style={styles.container}>
        <View style={styles.noApplicationsContainer}>
          <Icon name="eye-outline" size={50} color="#888" />
          <Text style={styles.noApplicationsText}>Ooh 👁️ It looks like you don't have any applications.</Text>
          <Text style={styles.noApplicationsText}>If you did make an application and don't see it listed here, pull down to refresh.</Text>
          <Text style={styles.noApplicationsText}>Otherwise, explore and apply at the centre!</Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('JobList')}
          >
            <Text style={styles.buttonText}>Explore Creches</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userDetails && (
        <View style={styles.header}>
          <Text style={styles.headerText}>This is your Application, {userDetails.display_name}</Text>
        </View>
      )}
      <FlatList
        data={applications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.applicationItem}>
            {creches[item.creche_id] ? (
              <>
                <Text style={styles.name}>Creche: {creches[item.creche_id].name}</Text>
                <Text style={styles.info}>Address: {creches[item.creche_id].address}</Text>
              </>
            ) : (
              <Text style={styles.info}>Creche details not found</Text>
            )}
            <Text style={styles.info}>Status: {item.application_status}</Text>
            <Text style={styles.info}>Applied On: {new Date(item.created_at).toLocaleDateString()}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleSelectApplication(item.id)}
              >
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
              {['New', 'Decline'].includes(item.application_status) && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteApplication(item.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchUserAndApplications} // Trigger refresh on pull down
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noApplicationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  noApplicationsText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
  },
  exploreButton: {
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  applicationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  viewButton: {
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#e94e77',
    padding: 10,
    borderRadius: 5,
  },
});

export default YourApplications;
