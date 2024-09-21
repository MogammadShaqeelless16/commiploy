import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import supabase from '../supabaseClient'; // Import Supabase client
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Icons for inputs

const Apply = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigation = useNavigation();
  const route = useRoute();
  const { crecheId } = route.params;

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
        .insert([
          {
            user_id: userId,
            creche_id: crecheId,
            source: 'Mobile-App',
            message: data.message,
            parent_name: data.parent_name,
            parent_phone_number: data.parent_phone_number,
            parent_email: data.parent_email,
            application_status: 'New',
            submitted_at: new Date(),
            parent_whatsapp: data.parent_whatsapp,
            number_of_children: data.number_of_children,
            parent_address: data.parent_address,
          }
        ]);

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
        <Text style={styles.headerText}>Apply for Creche</Text>
      </View>
      <View style={styles.form}>
        <Controller
          control={control}
          name="source"
          defaultValue="Mobile-App"
          render={({ field: { value } }) => (
            <View style={styles.inputContainer}>
              <MaterialIcons name="app-settings-alt" size={24} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                value={value}
                editable={false}
                placeholder="Source"
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="message"
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
              {errors.message && <Text style={styles.errorText}>{errors.message.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="parent_name"
          rules={{ required: 'Parent Name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={24} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Parent Name"
              />
              {errors.parent_name && <Text style={styles.errorText}>{errors.parent_name.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="parent_phone_number"
          rules={{ required: 'Parent Phone Number is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Ionicons name="call" size={24} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Parent Phone Number"
                keyboardType="phone-pad"
              />
              {errors.parent_phone_number && <Text style={styles.errorText}>{errors.parent_phone_number.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="parent_email"
          rules={{ 
            required: 'Parent Email is required', 
            pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Email is not valid' } 
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={24} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Parent Email"
                keyboardType="email-address"
              />
              {errors.parent_email && <Text style={styles.errorText}>{errors.parent_email.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="parent_whatsapp"
          rules={{ required: 'Parent WhatsApp is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <FontAwesome name="whatsapp" size={24} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Parent WhatsApp"
                keyboardType="phone-pad"
              />
              {errors.parent_whatsapp && <Text style={styles.errorText}>{errors.parent_whatsapp.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="number_of_children"
          rules={{ required: 'Number of Children is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Ionicons name="people" size={24} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Number of Children"
                keyboardType="number-pad"
              />
              {errors.number_of_children && <Text style={styles.errorText}>{errors.number_of_children.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="parent_address"
          rules={{ required: 'Parent Address is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Ionicons name="home" size={24} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Parent Address"
              />
              {errors.parent_address && <Text style={styles.errorText}>{errors.parent_address.message}</Text>}
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
    paddingTop:50,
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
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
