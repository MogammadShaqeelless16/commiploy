import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';

// Import images for mobile and desktop
const mobileImage = require('../assets/images/business_mobile.png');
const desktopImage = require('../assets/images/business.png');

const ListYourBusiness = ({ navigation }) => {
  const handleNavigateToApply = () => {
    navigation.navigate('ApplyForBusiness'); // Navigate to ApplyForBusiness screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}> {/* Wrap the content in ScrollView */}
      <Text style={styles.title}>List Your Business</Text>
      <Text style={styles.subtitle}>
        Want to have your business listed? Join our platform today!
      </Text>
      
      {/* Responsive image */}
      <Image 
        source={Dimensions.get('window').width < 768 ? mobileImage : desktopImage} 
        style={styles.image} 
      />

<Text style={styles.sectionTitle}>Business Packages:</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Feature</Text>
          <Text style={styles.tableHeaderText}>Free</Text>
          <Text style={styles.tableHeaderText}>Basic</Text>
          <Text style={styles.tableHeaderText}>Pro</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Landing Page Builder</Text>
          <Text style={styles.tableCell}>✔️</Text>
          <Text style={styles.tableCell}>✔️</Text>
          <Text style={styles.tableCell}>✔️</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>External Domain Support</Text>
          <Text style={styles.tableCell}>❌</Text>
          <Text style={styles.tableCell}>✔️</Text>
          <Text style={styles.tableCell}>✔️</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>CRM</Text>
          <Text style={styles.tableCell}>❌</Text>
          <Text style={styles.tableCell}>Manual Leads Management</Text>
          <Text style={styles.tableCell}>Advanced CRM</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Analytics</Text>
          <Text style={styles.tableCell}>Basic</Text>
          <Text style={styles.tableCell}>Enhanced</Text>
          <Text style={styles.tableCell}>Advanced</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Support</Text>
          <Text style={styles.tableCell}>Email</Text>
          <Text style={styles.tableCell}>Email & Chat</Text>
          <Text style={styles.tableCell}>Priority Support</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>What You Need:</Text>
      <Text style={styles.bulletPoint}>• A valid business registration document.</Text>
      <Text style={styles.bulletPoint}>• Proof of Address for your business.</Text>
      <Text style={styles.bulletPoint}>• Business Description and Services Offered.</Text>
      <Text style={styles.bulletPoint}>• Contact Information.</Text>


      <TouchableOpacity style={styles.applyButton} onPress={handleNavigateToApply}>
        <Text style={styles.applyButtonText}>List My Business</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allow the content to grow and be scrollable
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#007BFF',
  },
  bulletPoint: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  tableHeaderText: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: '100%', // Adjust width for responsiveness
    resizeMode: 'contain', // Maintain aspect ratio
    marginBottom: 20,
  },
});

export default ListYourBusiness;
