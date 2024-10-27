import React from 'react'; 
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Linking } from 'react-native';

const BankDetails = ({ bankDetails, setBankDetails, bankName, setBankName, hasBankAccount, setHasBankAccount }) => {
  return (
    <View>
      <Text style={styles.header}>Bank Details</Text>

      {/* Input for Bank Name */}
      <TextInput
        style={styles.input}
        placeholder="Bank Name"
        value={bankName}
        onChangeText={setBankName}
      />

      {/* Input for Bank Account Number */}
      <TextInput
        style={styles.input}
        placeholder="Bank Account Number"
        value={bankDetails}
        onChangeText={setBankDetails}
      />

      <TouchableOpacity onPress={() => setHasBankAccount(!hasBankAccount)}>
        <Text style={styles.link}>
          {hasBankAccount ? 'I have entered my bank details.' : 'I do not have a bank account.'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.link}>
        Apply for an account with FNB here:
        <Text
          style={styles.linkUrl}
          onPress={() => Linking.openURL('https://www.fnb.co.za/business-banking/accounts/solopreneur-bundle/index.html')}
        >
          FNB Solopreneur Bundle
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  linkUrl: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default BankDetails;
