import React, { useEffect, useState } from 'react'; // Import useState and useEffect
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons
import { fetchProfile } from './UserOperations/fetchProfile'; // Make sure the path is correct
import supabase from '../supabaseClient';

const NotificationButton = () => {
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState(0); // State to hold notification count

  const handleGoToNotifications = () => {
    navigation.navigate('NotificationsScreen'); // Replace with your Notifications screen
  };

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const profile = await fetchProfile();  // Assuming you have a function to fetch the user profile
        console.log('Fetched Profile:', profile); // Log the fetched profile

        const { data: notificationsData, error } = await supabase
          .from('notifications')
          .select('id')
          .eq('user_id', profile.id)
          .is('deleted', false);

        if (error) {
          console.error('Error fetching notification count:', error.message);
          return;
        }

        console.log('Fetched Notifications Data:', notificationsData); // Log the fetched notifications data
        setNotificationCount(notificationsData.length);  // Update the notification count
      } catch (fetchError) {
        console.error('Error fetching notifications:', fetchError.message);
      }
    };

    fetchNotificationCount();

    const intervalId = setInterval(fetchNotificationCount, 60000); // Fetch every 60 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []); // Empty dependency array to run only on mount

  return (
    <TouchableOpacity style={styles.container} onPress={handleGoToNotifications}>
      <View style={styles.iconContainer}>
        <Icon name="notifications" size={30} color="#333" /> {/* Notification Bell Icon */}
        {notificationCount > 0 && ( // Conditional rendering for notification count
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  iconContainer: {
    position: 'relative', // Set position to relative to position badge correctly
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default NotificationButton;
