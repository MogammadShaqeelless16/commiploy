// /UserOperations/updateProfile.js
import supabase from '../supabaseClient'; // Adjust the path based on your project structure

export const updateProfile = async (profile) => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    throw new Error('Unable to fetch user session');
  }

  const { error } = await supabase
    .from('users')
    .update({
      display_name: profile.display_name,
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone_number: profile.phone_number,
      id_number: profile.id_number,
      profile_picture_url: profile.profile_picture_url,
      bio: profile.bio,
    })
    .eq('id', session.user.id);

  if (error) {
    throw new Error('Error updating profile');
  }

  return true;
};
