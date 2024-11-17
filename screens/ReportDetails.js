import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ReportDetails = ({ route, navigation }) => {
  const { reportId } = route.params;

  // Generate random data for charts
  const generateRandomData = (count) => Array.from({ length: count }, () => Math.floor(Math.random() * 100));

  // Render unique graphs for each report
  const renderGraph = (reportId) => {
    switch (reportId) {
      case '1': // Sales Report
        return (
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{ data: generateRandomData(6) }],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={styles.chart}
          />
        );
      case '2': // Inventory Report
        return (
          <BarChart
            data={{
              labels: ['Item A', 'Item B', 'Item C', 'Item D', 'Item E'],
              datasets: [{ data: generateRandomData(5) }],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#1f77b4',
              backgroundGradientFrom: '#4d88c2',
              backgroundGradientTo: '#74a6d6',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={styles.chart}
          />
        );
      case '3': // User Activity Report
        return (
          <PieChart
            data={[
              { name: 'Clicks', population: 40, color: '#f54242', legendFontColor: '#7F7F7F', legendFontSize: 15 },
              { name: 'Views', population: 35, color: '#42f55a', legendFontColor: '#7F7F7F', legendFontSize: 15 },
              { name: 'Shares', population: 25, color: '#4290f5', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            ]}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            style={styles.chart}
          />
        );
      case '4': // Financial Report
        return (
          <LineChart
            data={{
              labels: ['Q1', 'Q2', 'Q3', 'Q4'],
              datasets: [{ data: generateRandomData(4) }],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#0e4d92',
              backgroundGradientFrom: '#3a77b8',
              backgroundGradientTo: '#62a4dc',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={styles.chart}
          />
        );
      case '5': // Customer Feedback Report
        return (
          <BarChart
            data={{
              labels: ['Positive', 'Neutral', 'Negative'],
              datasets: [{ data: generateRandomData(3) }],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffa726',
              backgroundGradientFrom: '#f77e21',
              backgroundGradientTo: '#f4a641',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={styles.chart}
          />
        );
      case '6': // Marketing Performance Report
        return (
          <LineChart
            data={{
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
              datasets: [{ data: generateRandomData(4) }],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#32cd32',
              backgroundGradientTo: '#98fb98',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={styles.chart}
          />
        );
      case '7': // HR Report
        return (
          <BarChart
            data={{
              labels: ['Employee A', 'Employee B', 'Employee C'],
              datasets: [{ data: generateRandomData(3) }],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ff6f61',
              backgroundGradientFrom: '#ff5c5c',
              backgroundGradientTo: '#ff8a8a',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={styles.chart}
          />
        );
      case '8': // Operational Efficiency Report
        return (
          <LineChart
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              datasets: [{ data: generateRandomData(5) }],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#6a1b9a',
              backgroundGradientFrom: '#8e24aa',
              backgroundGradientTo: '#ba68c8',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={styles.chart}
          />
        );
      default:
        return <Text style={styles.reportText}>No chart available for this report.</Text>;
    }
  };

  const renderReportContent = (reportId) => {
    const reportTitles = {
      '1': 'Sales Report',
      '2': 'Inventory Report',
      '3': 'User Activity Report',
      '4': 'Financial Report',
      '5': 'Customer Feedback Report',
      '6': 'Marketing Performance Report',
      '7': 'HR Report',
      '8': 'Operational Efficiency Report',
    };

    return <Text style={styles.reportText}>{reportTitles[reportId]}</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report Details</Text>
      {renderReportContent(reportId)}
      {renderGraph(reportId)}
      <Button title="Back to Reports" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  reportText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  chart: {
    marginVertical: 20,
    borderRadius: 10,
  },
});

export default ReportDetails;
