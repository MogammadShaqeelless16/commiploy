import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import supabase from '../supabaseClient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchProfile } from '../component/UserOperations/fetchProfile';
import Loading from '../component/loadingComponent/loading';

const NotificationsScreen = ({ navigation, updateNotificationCount }) => {
  const [notifications, setNotifications] = useState([]);
  const [senders, setSenders] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotificationsForUser = async () => {
      setLoading(true);

      try {
        const profile = await fetchProfile();

        const { data: notificationsData, error: notificationsError } = await supabase
          .from('notifications')
          .select('id, title, message, created_at, sender_id')
          .eq('user_id', profile.id)
          .is('deleted', false)
          .order('created_at', { ascending: false });

        if (notificationsError) {
          throw new Error(notificationsError.message);
        }

        const senderIds = [...new Set(notificationsData.map(n => n.sender_id))];

        const { data: sendersData, error: sendersError } = await supabase
          .from('users')
          .select('id, display_name, profile_picture_url')
          .in('id', senderIds);

        if (sendersError) {
          throw new Error(sendersError.message);
        }

        const sendersMap = sendersData.reduce((acc, sender) => {
          acc[sender.id] = sender;
          return acc;
        }, {});

        setNotifications(notificationsData);
        setSenders(sendersMap);
        updateNotificationCount(notificationsData.length); // Update the notification count
      } catch (fetchError) {
        console.error('Error fetching notifications:', fetchError.message);
        Alert.alert('Error', fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationsForUser();
  }, [updateNotificationCount]);

  const renderNotificationItem = ({ item }) => {
    const sender = senders[item.sender_id] || {};

    return (
      <TouchableOpacity
        style={styles.notificationItem}
        onPress={() => navigation.navigate('NotificationDetails', { notification: item })}
      >
        <View style={styles.notificationHeader}>
          {sender.profile_picture_url ? (
            <Image source={{ uri: sender.profile_picture_url }} style={styles.avatar} />
          ) : (
            <Icon name="account-circle" size={40} color="#888" style={styles.avatar} />
          )}
          <View style={styles.notificationDetails}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.date}>{new Date(item.created_at).toLocaleDateString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleExploreCenters = () => {
    navigation.navigate('DrawerNavigator'); // Navigate to the list of centers
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading/>
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#007bff" />
      </TouchableOpacity>
        <View style={styles.noNotificationsContainer}>
          <Icon name="eye-outline" size={50} color="#888" />
          <Text style={styles.noNotificationsText}>Ooh, you have no notifications here.</Text>
          <Text style={styles.noNotificationsText}>Go and explore apply for odd jobs or purchase products to start receiving notifications.</Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={handleExploreCenters}
          >
            <Text style={styles.buttonText}>Explore Commploy</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#007bff" />
      </TouchableOpacity>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
  },
  notificationDetails: {
    flex: 1,
  },
  senderName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    marginVertical: 4,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  noNotificationsText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
  },
  exploreButton: {
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});

export default NotificationsScreen;
