import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { fetchProfile } from '../UserOperations/fetchProfile';

const ProfileCompletion = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !profileData) {
    return null; // Don't render if there's an error or no profile data
  }

  const completionPercentage = calculateProfileCompletion(profileData);
  const chartData = [
    {
      name: 'Completed',
      population: completionPercentage,
      color: '#4caf50',
      legendFontColor: '#ffffff',
      legendFontSize: 15,
    },
    {
      name: 'Incomplete',
      population: 100 - completionPercentage,
      color: '#f44336',
      legendFontColor: '#ffffff',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>Profile Completion: {completionPercentage}%</Text>
      <PieChart
        data={chartData}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  );
};

const calculateProfileCompletion = (data) => {
  // Example logic to calculate profile completion percentage
  const totalFields = 8; // Total fields to check
  let filledFields = 0;

  if (data.display_name) filledFields++;
  if (data.email) filledFields++;
  if (data.first_name) filledFields++;
  if (data.last_name) filledFields++;
  if (data.phone_number) filledFields++;
  if (data.id_number) filledFields++;
  if (data.profile_picture_url) filledFields++;
  if (data.bio) filledFields++;

  return (filledFields / totalFields) * 100;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  progressText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileCompletion;
