import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import supabase from '../supabaseClient'; // Import the Supabase client
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // Ensure MaterialCommunityIcons is imported
import Loading from '../component/loadingComponent/loading';

const CrecheDetails = () => {
  const [creche, setCreche] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { crecheId } = route.params;

  useEffect(() => {
    const fetchCrecheDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('creches')
          .select('*')
          .eq('id', crecheId)
          .single();
        
        if (error) {
          throw error;
        }
        
        setCreche(data);
      } catch (error) {
        console.error('Error fetching creche details:', error.message);
      }
    };

    fetchCrecheDetails();
  }, [crecheId]);

  const handleApply = () => {
    // Navigate to an application screen or perform an action
    navigation.navigate('Apply', { crecheId });
  };

  const openLink = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const makePhoneCall = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const sendEmail = (email) => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  if (!creche) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {creche.header_image && <Image source={{ uri: creche.header_image }} style={styles.headerImage} />}
        <Text style={styles.name}>{creche.name}</Text>

        <View style={styles.infoContainer}>
          {creche.address && (
            <TouchableOpacity onPress={() => openLink(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(creche.address)}`)} style={styles.infoRow}>
              <Icon name="location-outline" size={24} color="#4a90e2" />
              <Text style={styles.infoLabel}>Address:</Text>
              <Text style={styles.infoValue}>{creche.address}</Text>
            </TouchableOpacity>
          )}
          {creche.phone_number && (
            <TouchableOpacity onPress={() => makePhoneCall(creche.phone_number)} style={styles.infoRow}>
              <Icon name="call-outline" size={24} color="#4a90e2" />
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={styles.infoValue}>{creche.phone_number}</Text>
            </TouchableOpacity>
          )}
          {creche.email && (
            <TouchableOpacity onPress={() => sendEmail(creche.email)} style={styles.infoRow}>
              <Icon name="mail-outline" size={24} color="#4a90e2" />
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{creche.email}</Text>
            </TouchableOpacity>
          )}
          {creche.capacity && (
            <View style={styles.infoRow}>
              <Icon name="people-outline" size={24} color="#4a90e2" />
              <Text style={styles.infoLabel}>Capacity:</Text>
              <Text style={styles.infoValue}>{creche.capacity}</Text>
            </View>
          )}
          {creche.operating_hours && (
            <View style={styles.infoRow}>
              <Icon name="calendar-outline" size={24} color="#4a90e2" />
              <Text style={styles.infoLabel}>Operating Hours:</Text>
              <Text style={styles.infoValue}>{creche.operating_hours}</Text>
            </View>
          )}
          {creche.website_url && (
            <View style={styles.infoRow}>
              <Icon name="globe-outline" size={24} color="#4a90e2" />
              <Text style={styles.infoLabel}>Website:</Text>
              <TouchableOpacity onPress={() => openLink(creche.website_url)}>
                <Text style={styles.link}>{creche.website_url}</Text>
              </TouchableOpacity>
            </View>
          )}
          {creche.description && (
            <View style={styles.infoRow}>
              <Icon name="document-text-outline" size={24} color="#4a90e2" />
              <Text style={styles.infoLabel}>Description:</Text>
              <Text style={styles.infoValue}>{creche.description}</Text>
            </View>
          )}
          {creche.registered !== undefined && (
            <View style={styles.infoRow}>
              <Icon name="checkmark-circle-outline" size={24} color="#4a90e2" />
              <Text style={styles.infoLabel}>Registered:</Text>
              <Text style={styles.infoValue}>{creche.registered ? 'Yes' : 'No'}</Text>
            </View>
          )}
        </View>

        <View style={styles.socialContainer}>
          {creche.facebook_url && (
            <TouchableOpacity style={styles.socialButton} onPress={() => openLink(creche.facebook_url)}>
              <Icon name="logo-facebook" size={24} color="#3b5998" />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          )}
          {creche.twitter_url && (
            <TouchableOpacity style={styles.socialButton} onPress={() => openLink(creche.twitter_url)}>
              <Icon name="logo-twitter" size={24} color="#1da1f2" />
              <Text style={styles.socialText}>X</Text>
            </TouchableOpacity>
          )}
          {creche.instagram_url && (
            <TouchableOpacity style={styles.socialButton} onPress={() => openLink(creche.instagram_url)}>
              <Icon name="logo-instagram" size={24} color="#c13584" />
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>
          )}
          {creche.linkedin_url && (
            <TouchableOpacity style={styles.socialButton} onPress={() => openLink(creche.linkedin_url)}>
              <Icon name="logo-linkedin" size={24} color="#0077b5" />
              <Text style={styles.socialText}>LinkedIn</Text>
            </TouchableOpacity>
          )}
          {creche.whatsapp_number && (
            <TouchableOpacity style={styles.socialButton} onPress={() => openLink(`https://wa.me/${creche.whatsapp_number}`)}>
              <Icon name="logo-whatsapp" size={24} color="#25D366" />
              <Text style={styles.socialText}>WhatsApp</Text>
            </TouchableOpacity>
          )}
          {creche.telegram_number && (
            <TouchableOpacity style={styles.socialButton} onPress={() => openLink(`https://t.me/${creche.telegram_number}`)}>
              <MaterialCommunityIcons name="telegram" size={24} color="#0088cc" />
              <Text style={styles.socialText}>Telegram</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  infoContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    elevation: 3,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  infoValue: {
    marginLeft: 8,
  },
  link: {
    color: '#007bff',
  },
  socialContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
  },
  socialText: {
    marginLeft: 8,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  applyButton: {
    padding: 8,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CrecheDetails;
