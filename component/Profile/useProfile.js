import { useState, useEffect } from 'react';
import { fetchProfile } from '../UserOperations/fetchProfile';
import supabase from '../../supabaseClient';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // To prevent setting state if the component is unmounted

    const loadProfile = async () => {
      setLoading(true);
      try {
        const profileData = await fetchProfile();
        if (isMounted) {
          setProfile(profileData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates if unmounted
    };
  }, []);

  const updateProfile = async (updatedProfile) => {
    setLoading(true);
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        throw new Error('Unable to fetch user session');
      }

      const { error: updateError } = await supabase
        .from('users')
        .update(updatedProfile)
        .eq('id', session.user.id);

      if (updateError) {
        throw new Error('Error updating profile');
      }

      // Update local profile state
      setProfile((prev) => ({
        ...prev,
        ...updatedProfile,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, updateProfile };
};
