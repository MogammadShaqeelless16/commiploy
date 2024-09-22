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
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      const { data, error } = await supabase
        .from('users')
        .select(`display_name, email, name, phone_number, id_number, profile_picture_url, bio, roles(role_name)`)
        .eq('id', session.user.id)
        .single();

      if (error) {
        Alert.alert('Error', 'Error fetching profile data');
        console.error('Profile Fetch Error:', error);
      } else {
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
