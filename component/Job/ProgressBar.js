import React from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';

const ProgressBar = ({ currentStep }) => {
  const steps = ['Details', 'Location', 'Images', 'Review'];
  
  // Animated values for indicators
  const animatedValue = new Animated.Value(0);
  
  // Animate the step indicators
  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: currentStep,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        // Calculate the position of each step indicator
        const indicatorStyle = {
          backgroundColor: animatedValue.interpolate({
            inputRange: [index - 1, index],
            outputRange: ['#ccc', '#00f'],
            extrapolate: 'clamp',
          }),
        };
        
        return (
          <View key={index} style={styles.step}>
            <Animated.View style={[styles.stepIndicator, indicatorStyle]} />
            <Text style={[styles.stepText, currentStep === index && styles.activeStepText]}>
              {step}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end', // Align items to the bottom for better visual appeal
    marginVertical: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  step: {
    alignItems: 'center',
    flex: 1,
  },
  stepIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#ccc', // Default color
    marginBottom: 5,
    transition: 'background-color 0.3s ease', // Smooth transition
  },
  activeStepText: {
    color: '#00f',
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ProgressBar;
