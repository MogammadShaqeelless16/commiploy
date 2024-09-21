import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StudentActions = ({ onPayFees, onLessonPlan, onDropOff }) => {
  return (
    <View style={styles.buttonGrid}>
      <ActionButton icon="credit-card" label="Pay Fees" onPress={onPayFees} />
      <ActionButton icon="book" label="Lesson Plan" onPress={onLessonPlan} />
      <ActionButton icon="check-circle" label="Dropped Off" onPress={onDropOff} />
    </View>
  );
};

const ActionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Icon name={icon} size={20} color="#ffffff" style={styles.buttonIcon} />
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '48%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default StudentActions;
