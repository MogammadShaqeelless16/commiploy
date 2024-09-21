import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import supabase from '../../supabaseClient';
import { useNavigation } from '@react-navigation/native';

const ChatListScreen = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch the currently logged-in user
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error.message);
        setError('Failed to get user.');
        setLoading(false);
        return;
      }

      if (user) {
        setUserId(user.id);
      } else {
        setError('No user is logged in.');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchConversations = async () => {
        try {
          const { data, error } = await supabase
            .from('conversations')
            .select(`
              id,
              participant_1,
              participant_2,
              last_message,
              last_message_time,
              participant1:participant_1 ( id, display_name ),
              participant2:participant_2 ( id, display_name )
            `)
            .or(`participant_1.eq.${userId},participant_2.eq.${userId}`)
            .order('last_message_time', { ascending: false });

          if (error) throw error;

          const formattedConversations = data.map(conversation => {
            const isParticipant1 = conversation.participant_1 === userId;
            const otherUser = isParticipant1
              ? conversation.participant2
              : conversation.participant1;

            return {
              id: conversation.id,
              otherUserId: otherUser.id,
              otherUserName: otherUser.display_name,
              lastMessage: conversation.last_message,
              lastMessageTime: conversation.last_message_time,
            };
          });

          setConversations(formattedConversations);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
          console.error('Error fetching conversations:', error.message);
        }
      };

      fetchConversations();
    }
  }, [userId]);

  const handleSelectConversation = (conversation) => {
    navigation.navigate('ChatScreen', {
      conversationId: conversation.id,
      userId,
      otherUserId: conversation.otherUserId,
    });
  };

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => handleSelectConversation(item)}
    >
      <Text style={styles.otherUserName}>{item.otherUserName}</Text>
      <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      <Text style={styles.lastMessageTime}>{new Date(item.lastMessageTime).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  conversationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 16,
  },
  otherUserName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#555',
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#888',
  },
});

export default ChatListScreen;
