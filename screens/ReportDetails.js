import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ReportDetails = ({ route, navigation }) => {
  const { reportId } = route.params;

  const renderReportContent = (reportId) => {
    switch (reportId) {
      case '1':
        return <Text style={styles.reportText}>This is the Sales Report. It contains data about sales over the past month.</Text>;
      case '2':
        return <Text style={styles.reportText}>This is the Inventory Report. It shows the current stock levels for all products.</Text>;
      case '3':
        return <Text style={styles.reportText}>This is the User Activity Report. It tracks user interactions and behaviors.</Text>;
      default:
        return <Text style={styles.reportText}>Report not found.</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report Details</Text>
      {renderReportContent(reportId)}
      
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
});

export default ReportDetails;
