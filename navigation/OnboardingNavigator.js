import React, { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JoinScreen1 from '../screens/onboarding/JoinScreen1';
import JoinScreen2 from '../screens/onboarding/JoinScreen2';
import JoinScreen3 from '../screens/onboarding/JoinScreen3';
import JoinScreen4 from '../screens/onboarding/JoinScreen4';

const { width: screenWidth } = Dimensions.get('window');

const OnboardingScreen = ({ onComplete }) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < 2) {
      scrollViewRef.current.scrollTo({
        x: (currentIndex + 1) * screenWidth,
        animated: true,
      });
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      onComplete(); // Notify that onboarding is complete
    } catch (error) {
      console.error('Failed to set onboarding status:', error);
    }
  };

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      onComplete(); // Notify that onboarding is complete
    } catch (error) {
      console.error('Failed to set onboarding status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollView}
      >
        <JoinScreen1 />
        <JoinScreen2 />
        <JoinScreen3 />
        <JoinScreen4 />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.paginationContainer}>
          <View style={styles.paginationDots}>
            {[0, 1, 2, 3].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: index === currentIndex ? '#4a90e2' : '#ddd' },
                ]}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>{currentIndex < 4 ? 'Next' : 'Get Started'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={handleSkip}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
  },
  paginationDots: {
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#4a90e2',
  },
  nextButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
