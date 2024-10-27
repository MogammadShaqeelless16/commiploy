import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart, LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const BusinessAnalytics = () => {
  const isMobile = screenWidth < 768; // Define breakpoint for mobile layout

  // Sample pie chart data
  const pieData = [
    { name: 'Active Profiles', population: 45, color: '#FF6347', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Inactive Profiles', population: 30, color: '#4682B4', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'New Profiles', population: 25, color: '#32CD32', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  // Sample line chart data
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [300, 500, 400, 600, 700, 800],
        color: () => `#4682B4`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={[styles.container, isMobile ? styles.mobileContainer : styles.desktopContainer]}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Profile Distribution</Text>
        <PieChart
          data={pieData}
          width={screenWidth * 0.8} // Adjust width for smaller screens
          height={200}
          chartConfig={chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          absolute
        />
      </View>
      
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Sales Trends</Text>
        <LineChart
          data={lineData}
          width={screenWidth * 0.8} // Adjust width for smaller screens
          height={200}
          chartConfig={chartConfig}
          bezier
        />
      </View>
    </View>
  );
};

const chartConfig = {
  backgroundColor: '#1cc910',
  backgroundGradientFrom: '#eff3ff',
  backgroundGradientTo: '#efefef',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  mobileContainer: {
    flexDirection: 'column', // Stack charts vertically
    alignItems: 'center',
  },
  desktopContainer: {
    flexDirection: 'row', // Display charts side-by-side
    justifyContent: 'space-between',
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default BusinessAnalytics;
