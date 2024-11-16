import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ currentStep }) => {
  const steps = ['Product Details', 'Location', 'Images', 'Review'];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>{steps[currentStep]}</Text>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${progress}%` },
          ]}
        />
      </View>
      <Text style={styles.progressText}>{Math.round(progress)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
});

export default ProgressBar;
