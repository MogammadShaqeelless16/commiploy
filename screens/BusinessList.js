import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListYourBusiness = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const openOverlay = () => {
    setModalVisible(true);
  };

  const closeOverlay = () => {
    setModalVisible(false);
  };

  const confirmNavigation = () => {
    closeOverlay();
    navigation.navigate('ApplyBusiness'); // Replace 'ApplyBusiness' with the exact screen name
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

      {/* Button to open overlay */}
      <TouchableOpacity style={styles.applyButton} onPress={openOverlay}>
        <Text style={styles.applyButtonText}>List My Business</Text>
      </TouchableOpacity>

      {/* Overlay Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={closeOverlay}
      >
        <View style={styles.overlayContainer}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayText}>Are you ready to apply for your business listing?</Text>
            <View style={styles.overlayButtonsContainer}>
              <TouchableOpacity onPress={confirmNavigation} style={styles.overlayButtonConfirm}>
                <Text style={styles.overlayButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeOverlay} style={styles.overlayButtonCancel}>
                <Text style={styles.overlayButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  overlayButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  overlayButtonConfirm: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  overlayButtonCancel: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  overlayButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ListYourBusiness;
