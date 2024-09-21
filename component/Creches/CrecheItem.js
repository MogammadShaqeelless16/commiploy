import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const placeholderImage = 'https://crechespots.org.za/wp-content/uploads/2024/08/recheSpot-1.gif';
const registeredIcon = require('../../assets/images/Registered.png');

const CrecheItem = ({ creche, onSelectCreche }) => {
  const logoUri = creche.logo && creche.logo.trim() !== "" ? creche.logo : placeholderImage;

  return (
    <TouchableOpacity
      style={styles.crecheItem}
      onPress={() => onSelectCreche(creche.id)}
    >
      <View style={styles.crecheHeader}>
        <Text style={styles.name}>{creche.name}</Text>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: logoUri }}
            style={styles.logo}
            onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
          />
          {creche.registered && (
            <Image
              source={registeredIcon}
              style={styles.registeredIcon}
            />
          )}
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={20} color="black" />
          <Text style={styles.infoText}>Address: {creche.address}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Weekly Price: R {creche.weekly_price}</Text>
          <Text style={styles.price}>Monthly Price: R {creche.monthly_price}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="navigate-outline" size={20} color="black" />
          <Text style={styles.infoText}>
            Distance: {creche.distance ? creche.distance.toFixed(2) : 'N/A'} km
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.detailsButton} onPress={() => onSelectCreche(creche.id)}>
        <Text style={styles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  crecheItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  crecheHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  registeredIcon: {
    width: 50,
    height: 50,
    marginLeft: 8,
  },
  infoContainer: {
    marginVertical: 8,
  },
  priceContainer: {
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8,
  },
  detailsButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CrecheItem;
