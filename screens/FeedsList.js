import React, { useState } from 'react';
import { ScrollView, StyleSheet, Dimensions, FlatList, View, ActivityIndicator, Text } from 'react-native';
import ProductCard from '../component/Feeds/ProductCard';
import JobCard from '../component/Feeds/JobCard';
import ServiceProviderCard from '../component/Feeds/ServiceProviderCard';
import SectionHeader from '../component/Feeds/SectionHeader';
import ProfileAlert from '../component/Profile/ProfileAlert';

const { width: screenWidth } = Dimensions.get('window');

const FeedsList = ({ navigation }) => {
  const [showProfileAlert, setShowProfileAlert] = useState(true); // Manage visibility here

  const products = [
    { id: '1', title: 'Product 1', price: 'R199', description: 'Quality product 1' },
    { id: '2', title: 'Product 2', price: 'R299', description: 'Quality product 2' },
    { id: '3', title: 'Product 3', price: 'R399', description: 'Quality product 3' },
  ];

  const jobs = [
    { id: '1', title: 'Software Engineer', description: 'Full-time position' },
    { id: '2', title: 'Graphic Designer', description: 'Remote job opportunity' },
  ];

  const services = [
    { id: '1', title: 'Plumbing Services', description: 'Expert plumbers available' },
    { id: '2', title: 'Cleaning Services', description: 'Professional cleaning services' },
    { id: '3', title: 'Electrical Services', description: 'Certified electricians' },
    { id: '4', title: 'Landscaping Services', description: 'Beautiful gardens designed' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Alert */}
      {showProfileAlert && (
        <ProfileAlert 
          navigation={navigation} 
          onClose={() => setShowProfileAlert(false)} // Close alert immediately
        />
      )}

      {/* Profile Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Text style={styles.progressText}>Profile Completion</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>

      <SectionHeader title="Nearby Products" />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      <SectionHeader title="Nearby Jobs" />
      <FlatList
        data={jobs}
        renderItem={({ item }) => <JobCard job={item} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      <SectionHeader title="Service Providers" />
      <FlatList
        data={services}
        renderItem={({ item }) => <ServiceProviderCard service={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.verticalList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  horizontalList: {
    paddingVertical: 10,
  },
  verticalList: {
    paddingVertical: 10,
  },
  progressBarContainer: {
    marginTop: 20,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default FeedsList;
