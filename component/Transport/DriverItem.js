import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const DriverItem = ({ driver, onHire, onPay, onMessage, onProfilePress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.profileContainer}>
        {driver.profile_picture_url ? (
          <Image
            source={{ uri: driver.profile_picture_url }}
            style={styles.profilePicture}
          />
        ) : (
          <View style={styles.profilePicture}>
            <Text style={styles.initials}>{driver.display_name[0]}</Text>
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{driver.display_name}</Text>
          <Text style={styles.suburb}>{driver.suburb}</Text>
          <Text style={styles.price}>R {driver.price}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onHire}>
          <Text style={styles.buttonText}>Hire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onMessage}>
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onProfilePress}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  initials: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  suburb: {
    fontSize: 16,
    color: '#777',
  },
  price: {
    fontSize: 16,
    color: '#e63946',
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default DriverItem;
