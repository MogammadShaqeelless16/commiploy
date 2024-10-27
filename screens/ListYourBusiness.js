import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ListYourBusiness = ({ navigation }) => { // Receive navigation prop here
  const handleNavigateToApply = () => {
    navigation.navigate('ApplyForBusiness'); // Navigate to ApplyForBusiness screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Your Business</Text>
      <Text style={styles.subtitle}>
        Want to have your business listed? Join our platform today!
      </Text>

      <Text style={styles.sectionTitle}>What You Need:</Text>
      <Text style={styles.bulletPoint}>• A valid business registration document.</Text>
      <Text style={styles.bulletPoint}>• Proof of Address for your business.</Text>
      <Text style={styles.bulletPoint}>• Business Description and Services Offered.</Text>
      <Text style={styles.bulletPoint}>• Contact Information.</Text>

      <Text style={styles.sectionTitle}>Benefits of Listing Your Business:</Text>
      <Text style={styles.bulletPoint}>• Increased visibility to potential customers.</Text>
      <Text style={styles.bulletPoint}>• Access to a larger customer base.</Text>
      <Text style={styles.bulletPoint}>• Opportunities for collaboration with other businesses.</Text>

      <TouchableOpacity style={styles.applyButton} onPress={handleNavigateToApply}>
        <Text style={styles.applyButtonText}>List My Business</Text>
      </TouchableOpacity>
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
});

export default ListYourBusiness;
