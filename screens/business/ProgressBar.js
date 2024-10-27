import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    'Profile',
    'Skills',
    'Documents',
    'Bank',
    'Review',
  ];

  return (
    <View style={styles.progressContainer}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View
            style={[
              styles.progressStep,
              index === currentStep ? styles.activeStep : styles.inactiveStep,
            ]}
          />
          <Text style={index === currentStep ? styles.activeText : styles.inactiveText}>
            {step}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  stepContainer: {
    alignItems: 'center',
  },
  progressStep: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  activeStep: {
    backgroundColor: '#4caf50',
  },
  inactiveStep: {
    backgroundColor: '#ccc',
  },
  activeText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  inactiveText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
});

export default ProgressBar;
