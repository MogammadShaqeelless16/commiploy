import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import supabase from '../supabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      console.log('Fetching session...'); // Log when fetching the session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        console.error('Session Error:', sessionError); // Log session error if any
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);
      console.log('Session fetched successfully:', session); // Log session data

      console.log('Fetching user profile...'); // Log when fetching user profile
      const { data, error } = await supabase
        .from('users')
        .select(`display_name, email, name,
          phone_number, id_number, profile_picture_url, bio, roles(role_name)`)
        .eq('id', session.user.id)
        .single();

      if (error) {
        Alert.alert('Error', 'Error fetching profile data');
        console.error('Profile Fetch Error:', error); // Log profile fetch error
      } else {
        console.log('Profile fetched successfully:', data); // Log successfully fetched profile
        setProfile(data);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ profile, loading, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
