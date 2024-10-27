import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CountUp from 'react-countup';

const DashboardCard = ({ title, endValue, onClick }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onClick}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>
        <CountUp start={0} end={endValue} duration={2.5} separator="," />
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5, // for Android
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default DashboardCard;
