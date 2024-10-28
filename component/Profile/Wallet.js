import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Wallet = ({ navigation }) => {
  const [balance, setBalance] = useState(1234.56); // Example balance
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const bankName = "Your Bank";
  const accountNumber = "123456789";
  const accountType = "Savings Account";

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount <= balance && amount > 0) {
      setBalance(balance - amount);
      setWithdrawAmount(''); // Clear the input
      setModalVisible(false); // Close the modal
    } else {
      alert('Insufficient balance or invalid amount'); // You can replace this with a modal if needed
    }
  };

  return (
    <View style={styles.container}>
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
          <TouchableOpacity style={styles.withdrawButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.withdrawButtonText}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={16} color="#007bff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Modal for Withdrawal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Withdraw Money</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount to withdraw"
            keyboardType="numeric"
            value={withdrawAmount}
            onChangeText={setWithdrawAmount}
          />
          <View style={styles.modalButtons}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="#f00" />
            <Button title="Confirm" onPress={handleWithdraw} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    width: '90%', // Make it responsive
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
    justifyContent: 'space-between', // Space between buttons
    alignItems: 'center',
  },
  withdrawButton: {
    backgroundColor: '#007bff', // Blue button for withdraw
    borderRadius: 8,
    padding: 10,
  },
  withdrawButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default Wallet;
