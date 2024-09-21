import supabase from '../../supabaseClient'; // Adjust the path based on your project structure

export const fetchProfile = async () => {
  console.log('Fetching user session...');
  
  // Get the current session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !session) {
    console.error('Unable to fetch user session', sessionError);
    throw new Error('Unable to fetch user session');
  }

  console.log('User session fetched:', session);

  // Fetch profile data from Supabase
  console.log('Fetching profile data...');
  const { data, error } = await supabase
    .from('users')
    .select(`
      id, display_name, email, first_name, last_name,
      phone_number, id_number, profile_picture_url, bio,
      creches (
        id,
        name
      ),
      roles (
        id,
        role_name
      )
    `)
    .eq('id', session.user.id)
    .single();

  if (error) {
    console.error('Error fetching profile data', error);
    throw new Error('Error fetching profile data');
  }

  console.log('Profile data fetched:', data);

  return data;
};
