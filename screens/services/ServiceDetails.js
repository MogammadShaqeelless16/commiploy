import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import supabase from '../../supabaseClient';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../../component/loadingComponent/loading';
import AlertModal from '../../component/AlertModal';

const ServiceDetails = ({ route, navigation }) => {
  const { serviceId } = route.params;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // For alert modal visibility

  const fetchServiceDetails = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*, shop_id:businesses(*)')
        .eq('id', serviceId)
        .single();

      if (error) {
        throw new Error('Error fetching service details');
      }

      console.log("Fetched Service Data: ", data);
      setService(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  const handleContactProvider = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      // Show modal if user is not signed in
      setModalVisible(true);
    } else {
      if (service && service.shop_id) {
        navigation.navigate('UserProfileDetails', { userId: service.shop_id.owner }); // Assuming owner is the user ID
      } else {
        Alert.alert('Error', 'Provider information is not available.');
      }
    }
  };

  const handleViewBusiness = () => {
    if (service && service.shop_id) {
      navigation.navigate('BusinessDetails', { businessId: service.shop_id.id });
    } else {
      Alert.alert('Error', 'Business information is not available.');
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (loading) {
    return <Loading />;
  }

  if (!service) {
    return <Text style={styles.errorText}>No service details found.</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#007bff" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.serviceName}>{service.name}</Text>
      <Text style={styles.serviceDescription}>{service.description}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.serviceDetails}>Price: R{service.price.toFixed(2)}</Text>
        <Text style={styles.serviceDetails}>Call Out Fee: R{service.call_out_fee.toFixed(2)}</Text>
        <Text style={styles.serviceDetails}>
          Created At: {new Date(service.created_at).toLocaleDateString()}
        </Text>
        {service.shop_id && (
          <Text style={styles.serviceDetails}>Provided by: {service.shop_id.name}</Text>
        )}
      </View>

      <View style={styles.ratingContainer}>
        <Rating
          startingValue={service.rating}
          imageSize={20}
          readonly
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContactProvider}>
        <Text style={styles.buttonText}>Contact Provider</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleViewBusiness}>
        <Text style={styles.buttonText}>View Business Details</Text>
      </TouchableOpacity>

      {/* Alert Modal */}
      <AlertModal 
        visible={modalVisible} 
        message="You need to have an account to contact the provider. Please log in or sign up."
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 8,
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  serviceDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  detailsContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  serviceDetails: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  ratingContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 18,
  },
});

export default ServiceDetails;
