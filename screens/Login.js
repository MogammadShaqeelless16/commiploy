import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground, Animated, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../supabaseClient';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [slideAnim] = useState(new Animated.Value(-200)); // Initial position off-screen to the right

  useEffect(() => {
    const checkSession = async () => {
      const session = await AsyncStorage.getItem('userSession');
      if (session) {
        navigation.navigate('DrawerNavigator');
      }
    };

    checkSession();
  }, [navigation]);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    Animated.timing(slideAnim, {
      toValue: -200,
      duration: 0,
      useNativeDriver: true,
    }).start(); // Hide the overlay

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) {
        setError(authError.message);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(); // Show the overlay
      } else {
        await AsyncStorage.setItem('userSession', JSON.stringify(data.session));
        navigation.navigate('DrawerNavigator');
      }
    } catch (error) {
      setError(error.message);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(); // Show the overlay
    } finally {
      setLoading(false);
    }
  };

  // Determine the background image based on the platform
  const backgroundImage = Platform.OS === 'web' ? require('../assets/images/Background_desktop.png') : require('../assets/images/Background_mobile.png');

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.welcome}>Welcome to Creche Spots</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>Create one</Text>
        </Text>
      </ScrollView>
      {error ? (
        <Animated.View style={[styles.overlay, { transform: [{ translateX: slideAnim }] }]}>
          <Text style={styles.overlayText}>{error}</Text>
        </Animated.View>
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
    width: '90%',
  },
  logo: {
    width: 200,
    height: 120,
    alignSelf: 'center',
    marginBottom: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 16,
    color: '#4a90e2',
  },
  signUpText: {
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 16,
    color: '#888',
  },
  signUpLink: {
    color: '#4a90e2',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: '100%',
    backgroundColor: '#f44336',
    padding: 20,
    borderRadius: 10,
    zIndex: 1000,
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Login;
