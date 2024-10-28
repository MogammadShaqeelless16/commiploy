import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Wallet = () => {
  const balance = 1234.56; // Example balance
  const bankName = "Your Bank";
  const accountNumber = "123456789";
  const accountType = "Savings Account";
  
  return (
    <TouchableOpacity style={styles.card} onPress={() => console.log('Wallet pressed')}>
      <View style={styles.header}>
        <Icon name="wallet" size={30} color="#fff" />
        <Text style={styles.title}>Wallet</Text>
      </View>
      <Text style={styles.balance}>R {balance.toFixed(2)}</Text>

      <View style={styles.bankDetails}>
        <Text style={styles.bankName}>{bankName}</Text>
        <Text style={styles.accountType}>{accountType}</Text>
        <Text style={styles.accountNumber}>Account Number: {accountNumber}</Text>
      </View>
      <View style={styles.footer}>
        <Icon name="chevron-right" size={16} color="#007bff" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4caf50', // Green background for the wallet
    borderRadius: 12,
    marginVertical: 15,
    marginHorizontal: 15,
    padding: 20,
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  bankDetails: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  bankName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  accountType: {
    fontSize: 16,
    color: '#666',
  },
  accountNumber: {
    fontSize: 16,
    color: '#666',
  },
  footer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Wallet;
