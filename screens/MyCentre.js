import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import supabase from '../supabaseClient';

const MyCentre = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [creches, setCreches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentsAndCreches();
  }, []);

  const fetchStudentsAndCreches = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch students
        const { data: studentData, error: studentError } = await supabase
          .from('students') // Replace with the actual table name if different
          .select('*')
          .eq('user_id', user.id);

        if (studentError) {
          throw studentError;
        }

        setStudents(studentData);

        // Fetch creches
        const { data: crecheData, error: crecheError } = await supabase
          .from('creches') // Replace with the actual table name if different
          .select('*');

        if (crecheError) {
          throw crecheError;
        }

        setCreches(crecheData);
      } else {
        Alert.alert('Error', 'Unable to fetch user information');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Error fetching students and creches');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (students.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noStudentsText}>Hi there, it seems you are not part of any creche or student groups.</Text>
        <Text style={styles.noStudentsText}>Maybe try applying to a creche or check your existing applications.</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Apply')}
          >
            <Text style={styles.buttonText}>Apply to a Creche</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Applications')}
          >
            <Text style={styles.buttonText}>Check Applications</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Create a map of creche_id to creche name
  const crecheMap = creches.reduce((acc, creche) => {
    acc[creche.id] = creche.name;
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Centre</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.studentCard}>
            <Text style={styles.crecheName}>Creche: {crecheMap[item.creche_id] || 'Unknown'}</Text>
            <Text style={styles.studentName}>Name: {item.name}</Text>
            <Text style={styles.studentDetails}>Fees Owed: {item.fees_owed}</Text>
            <Text style={styles.studentDetails}>Fees Paid: {item.fees_paid}</Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate('MyCentreDetails', { studentId: item.id })}
            >
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default MyCentre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  studentCard: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  crecheName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  studentDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  noStudentsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  detailsButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  detailsButtonText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
});
