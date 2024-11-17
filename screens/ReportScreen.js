import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

// Placeholder report data (this could be fetched from an API or database in a real-world application)
const reports = [
  { id: '1', name: 'Sales Report', description: 'View sales data over time.' },
  { id: '2', name: 'Inventory Report', description: 'View stock levels and product details.' },
  { id: '3', name: 'User Activity Report', description: 'View user interaction data.' },
];

const ReportPage = ({ navigation }) => {

  const handleReportClick = (reportId) => {
    // Navigate to the specific report page based on the report ID
    navigation.navigate('ReportDetails', { reportId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reports</Text>
      
      {/* List of available reports */}
      {reports.map((report) => (
        <TouchableOpacity key={report.id} style={styles.reportButton} onPress={() => handleReportClick(report.id)}>
          <Text style={styles.reportText}>{report.name}</Text>
          <Text style={styles.reportDescription}>{report.description}</Text>
        </TouchableOpacity>
      ))}
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
  reportButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  reportText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  reportDescription: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
});

export default ReportPage;