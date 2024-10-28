import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Linking, TouchableOpacity, Image } from 'react-native';
import supabase from '../../supabaseClient';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icons
import { fetchCurrentUser } from '../../component/UserOperations/fetchProfile';

const BusinessDetails = ({ route, navigation }) => {
  const { businessId, businessSlug } = route.params;
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false); // New state for checking ownership

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

      setBusiness(data);
      console.log("Business details:", data); // Log the fetched business details

      // Fetch the user's business IDs to check ownership
      const user = await fetchCurrentUser();

      // Check if user is fetched successfully
      if (!user) {
        Alert.alert('Error', 'Unable to fetch user data.');
        setLoading(false);
        return;
      }

      const { data: userBusinessesData, error: businessesError } = await supabase
        .from('users_businesses')
        .select('business_id')
        .eq('user_id', user.id);

      if (businessesError) {
        throw new Error('Error fetching user businesses');
      }

      console.log("User's businesses:", userBusinessesData); // Log the user's businesses

      // Check if the business ID exists in the user's businesses
      const isUserOwner = userBusinessesData.some((item) => item.business_id === businessId);
      setIsOwner(isUserOwner);
      console.log("Is user owner:", isUserOwner); // Log ownership status
      
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error("Error fetching business details or user businesses:", error); // Log errors
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessDetails();
  }, [businessId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!business) {
    return <Text style={styles.errorText}>No business details found for ID: {businessId}</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#007bff" />
      </TouchableOpacity>
      {business.header_image ? (
        <Image source={{ uri: business.header_image }} style={styles.headerImage} />
      ) : (
        <Image source={require('../../assets/default-header.png')} style={styles.headerImage} />
      )}
      <Text style={styles.businessName}>{business.name}</Text>

      {isOwner && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditBusinessDetails', { businessId })}
        >
          <Text style={styles.editButtonText}>Edit Business</Text>
        </TouchableOpacity>
      )}

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Icon name="email" size={20} color="#555" />
          <Text style={styles.businessDetails}>Email: {business.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="location-on" size={20} color="#555" />
          <Text style={styles.businessDetails}>Address: {business.address}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="phone" size={20} color="#555" />
          <Text style={styles.businessDetails}>Contact Number: {business.contact_number}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="info" size={20} color="#555" />
          <Text style={styles.businessDetails}>Description: {business.slogan}</Text>
        </View>
      </View>

      <View style={styles.socialLinksContainer}>
        <Text style={styles.socialLinksTitle}>Connect with us:</Text>
        {business.facebook && (
          <TouchableOpacity onPress={() => Linking.openURL(business.facebook)}>
            <Text style={styles.socialLink}>Facebook</Text>
          </TouchableOpacity>
        )}
        {business.instagram && (
          <TouchableOpacity onPress={() => Linking.openURL(business.instagram)}>
            <Text style={styles.socialLink}>Instagram</Text>
          </TouchableOpacity>
        )}
        {business.twitter && (
          <TouchableOpacity onPress={() => Linking.openURL(business.twitter)}>
            <Text style={styles.socialLink}>Twitter</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Button to open the business website */}
      <TouchableOpacity
        style={styles.websiteButton}
        onPress={() => Linking.openURL(`https://commibuy.netlify.app/business/${business.slug}`)}
      >
        <Text style={styles.websiteButtonText}>Visit Website</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  backButton: {
    marginBottom: 12,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  businessName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  businessDetails: {
    fontSize: 16,
    marginLeft: 8,
    color: '#555',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  socialLinksContainer: {
    marginTop: 20,
  },
  socialLinksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  socialLink: {
    fontSize: 16,
    color: '#007bff',
    marginVertical: 4,
  },
  websiteButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  websiteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BusinessDetails;
