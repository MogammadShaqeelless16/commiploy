import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StudentDetailCard = ({ student }) => {
  return (
    <View style={styles.card}>
      <DetailRow icon="user" label="Name" value={student.name} />
      <DetailRow icon="calendar" label="Age" value={student.age} />
      <DetailRow icon="birthday-cake" label="DOB" value={student.dob} />
      <DetailRow icon="book" label="Class" value={student.class} />
      <DetailRow icon="home" label="Address" value={student.address} />
      <DetailRow icon="stethoscope" label="Disabilities/Allergies" value={student.disabilities_allergies} />
      <DetailRow icon="dollar" label="Fees Owed" value={student.fees_owed} />
      <DetailRow icon="dollar" label="Fees Paid" value={student.fees_paid} />
    </View>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <View style={styles.detailContainer}>
    <Icon name={icon} size={20} color="#4a90e2" />
    <Text style={styles.detail}>{label}: {value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detail: {
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
});

export default StudentDetailCard;
