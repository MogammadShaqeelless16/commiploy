// NotificationManager.js
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Request permission to show notifications
export const requestPermissionsAsync = async () => {
  let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    const { status: newStatus } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    status = newStatus;
  }
  return status === 'granted';
};

// Schedule a local notification
export const scheduleNotification = async (title, body, secondsFromNow) => {
  const hasPermission = await requestPermissionsAsync();

  if (!hasPermission) {
    console.warn('Notification permissions not granted');
    return;
  }

  // Schedule a local notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: {
      seconds: secondsFromNow,
    },
  });
};

// Handle notification responses
export const setNotificationHandlers = () => {
  Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received:', notification);
  });

  Notifications.addNotificationResponseReceivedListener(response => {
    console.log('Notification response received:', response);
  });
};
