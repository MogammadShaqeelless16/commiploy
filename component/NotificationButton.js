import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons

const NotificationButton = () => {
  const navigation = useNavigation();

  const handleGoToNotifications = () => {
    navigation.navigate('Notifications'); // Replace with your Notifications screen
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleGoToNotifications}>
      <Icon name="notifications" size={30} color="#333" /> {/* Notification Bell Icon */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});

export default NotificationButton;
