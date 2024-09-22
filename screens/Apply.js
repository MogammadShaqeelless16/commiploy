import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import supabase from '../supabaseClient'; // Import Supabase client
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Icons for inputs

const Apply = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigation = useNavigation();
  const route = useRoute();
  const { jobId } = route.params;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (user) {
          setUserId(user.id);
        }
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch user ID.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  const onSubmit = async (data) => {
    if (!userId) {
      Alert.alert('Error', 'User is not authenticated.');
      return;
    }

    try {
      const { error } = await supabase
        .from('applications')
        .insert([{
          user_id: userId,
          job_id: jobId,
          cover_letter: data.cover_letter,
          application_status: 'New',
          submitted_at: new Date(),
        }]);

      if (error) {
        throw error;
      }

      Alert.alert('Success', 'Your application has been submitted.');
      navigation.goBack(); // Navigate back to the previous screen or wherever appropriate
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Apply for Job</Text>
      </View>
      <View style={styles.note}>
        <Text style={styles.noteText}>
          Your profile will be submitted as a resume. Please make sure all your information is up to date in your profile.
        </Text>
      </View>
      <View style={styles.form}>
        <Controller
          control={control}
          name="cover_letter"
          rules={{ required: 'Cover Letter is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <MaterialIcons name="message" size={24} color="gray" style={styles.icon} />
              <TextInput
                style={styles.textArea}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Cover Letter"
                multiline
                numberOfLines={4}
              />
              {errors.cover_letter && <Text style={styles.errorText}>{errors.cover_letter.message}</Text>}
            </View>
          )}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    flex: 1,
    textAlign: 'center',
  },
  note: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  form: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  textArea: {
    flex: 1,
    fontSize: 16,
    height: 100, // Adjust height for text area
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Apply;
