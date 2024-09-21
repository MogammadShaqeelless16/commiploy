import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import supabase from '../supabaseClient';
import Loading from '../component/loadingComponent/loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const MyCentreDetails = ({ route, navigation }) => {
  const { studentId } = route.params;
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', studentId)
        .single();

      if (error) {
        throw error;
      }

      setStudent(data);
    } catch (error) {
      Alert.alert('Error', error.message || 'Error fetching student details');
    } finally {
      setLoading(false);
    }
  };

  const handlePayFees = () => {
    Alert.alert('Payment', 'Redirect to payment page.');
    // Implement the actual payment logic here
  };

  const handleLessonPlan = () => {
    navigation.navigate('LessonsDetails', { crecheId: student.creche_id });
  };

  const handleDropOff = async () => {
    try {
      const { error } = await supabase
        .from('attendance_students')
        .insert({
          student_id: studentId,
          attendance_date: moment().format('YYYY-MM-DD'),
          status: 'Present',
        });

      if (error) {
        throw error;
      }

      Alert.alert('Success', 'Attendance marked as present.');
    } catch (error) {
      Alert.alert('Error', error.message || 'Error marking attendance');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!student) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>Student details not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-left" size={20} color="#4a90e2" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Student Details</Text>
        <View style={styles.card}>
          <View style={styles.detailContainer}>
            <Icon name="user" size={20} color="#4a90e2" />
            <Text style={styles.detail}>Name: {student.name}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Icon name="calendar" size={20} color="#4a90e2" />
            <Text style={styles.detail}>Age: {student.age}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Icon name="birthday-cake" size={20} color="#4a90e2" />
            <Text style={styles.detail}>DOB: {student.dob}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Icon name="book" size={20} color="#4a90e2" />
            <Text style={styles.detail}>Class: {student.class}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Icon name="home" size={20} color="#4a90e2" />
            <Text style={styles.detail}>Address: {student.address}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Icon name="stethoscope" size={20} color="#4a90e2" />
            <Text style={styles.detail}>Disabilities/Allergies: {student.disabilities_allergies}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Icon name="dollar" size={20} color="#4a90e2" />
            <Text style={styles.detail}>Fees Owed: {student.fees_owed}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Icon name="dollar" size={20} color="#4a90e2" />
            <Text style={styles.detail}>Fees Paid: {student.fees_paid}</Text>
          </View>
        </View>
        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePayFees}
          >
            <Icon name="credit-card" size={20} color="#ffffff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Pay Fees</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLessonPlan}
          >
            <Icon name="book" size={20} color="#ffffff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Lesson Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleDropOff}
          >
            <Icon name="check-circle" size={20} color="#ffffff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Dropped Off</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyCentreDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    paddingTop: 20, // Ensure the title is not hidden
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detail: {
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '48%', // Ensures buttons are side-by-side
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontSize: 18,
  },
});
