import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Pressable, ImageBackground, Image } from 'react-native';
import supabase from '../../supabaseClient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fetchProfile } from '../../component/UserOperations/fetchProfile';

const DEFAULT_PROFILE_PICTURE_URL = 'https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service.png'; // Replace with your actual default URL

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { otherUserId } = route.params; // Receive otherUserId here

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const setup = async () => {
      try {
        console.log('Fetching current user profile...');
        const profile = await fetchProfile();
        console.log('Fetched profile:', profile);

        if (!profile) {
          console.error('No profile data returned');
          throw new Error('Unable to fetch user profile');
        }
        if (!profile.id) {
          console.error('Profile ID is missing');
          throw new Error('Profile ID is missing');
        }
        setUserId(profile.id);

        console.log('Fetching other user details...');
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, display_name, profile_picture_url')
          .eq('id', otherUserId)
          .single();

        console.log('Other user ID:', otherUserId);
        console.log('Other user data:', userData);
        console.log('Other user error:', userError);

        if (userError) {
          console.error('Error fetching other user:', userError.message);
          throw userError;
        }

        if (!userData) {
          console.error('No data found for user with ID:', otherUserId);
          throw new Error(`No data found for user with ID: ${otherUserId}`);
        }

        setOtherUser({
          ...userData,
          profile_picture_url: userData.profile_picture_url || DEFAULT_PROFILE_PICTURE_URL,
        });

        console.log('Checking if conversation exists...');
        const { data: conversation, error: conversationError } = await supabase
          .from('conversations')
          .select('id')
          .or(`and(participant_1.eq.${profile.id},participant_2.eq.${otherUserId}),and(participant_1.eq.${otherUserId},participant_2.eq.${profile.id})`)
          .single();

        console.log('Conversation data:', conversation);
        console.log('Conversation error:', conversationError);

        if (conversationError && conversationError.details !== 'Results contain 0 rows') {
          console.error('Error checking conversation existence:', conversationError.message);
          throw conversationError;
        }

        let convId;

        if (!conversation) {
          console.log('Creating new conversation...');
          const { data: newConversation, error: creationError } = await supabase
            .from('conversations')
            .insert([{ participant_1: profile.id, participant_2: otherUserId }])
            .select('id')
            .single();

          console.log('New conversation data:', newConversation);
          console.log('Creation error:', creationError);

          if (creationError) {
            console.error('Error creating new conversation:', creationError.message);
            throw creationError;
          }

          convId = newConversation.id;
        } else {
          convId = conversation.id;
        }

        setConversationId(convId);

        console.log('Fetching messages for conversation...');
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', convId)
          .order('sent_at', { ascending: true });

        console.log('Messages data:', messagesData);
        console.log('Messages error:', messagesError);

        if (messagesError) {
          console.error('Error fetching messages:', messagesError.message);
          throw messagesError;
        }

        setMessages(messagesData);
      } catch (error) {
        console.error('Error setting up conversation:', error.message);
      }
    };

    setup();
  }, [otherUserId]);

  useEffect(() => {
    if (conversationId) {
      console.log('Subscribing to new messages...');
      const subscription = supabase
        .from(`messages:conversation_id=eq.${conversationId}`)
        .on('INSERT', payload => {
          console.log('New message received:', payload.new);
          setMessages(prevMessages => [...prevMessages, payload.new]);
        })
        .subscribe();

      return () => {
        console.log('Unsubscribing from messages...');
        supabase.removeSubscription(subscription);
      };
    }
  }, [conversationId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
        // Debugging: Check if userId and conversationId are set
        if (!userId || !conversationId) {
            console.error('User ID or Conversation ID is missing', { userId, conversationId });
            return;
        }

        console.log('Sending new message...', { userId, conversationId });

        const { data: message, error } = await supabase
            .from('messages')
            .insert([{ conversation_id: conversationId, sender_id: userId, message: newMessage }])
            .select()
            .single();

        if (error) {
            console.error('Error sending message:', error.message);
            throw error;
        }

        console.log('Message sent:', message);
        setMessages(prevMessages => [...prevMessages, message]);
        setNewMessage('');
    } catch (error) {
        console.error('Error sending message:', error.message);
    }
};


  const handleProfilePress = () => {
    if (otherUserId) {
      navigation.navigate('UserProfileScreen', { userId: otherUserId });
    }
  };

  const handleBackPress = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.sender_id === userId ? styles.sent : styles.received]}>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );

  if (!otherUser) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/Background_mobile.png')} // Ensure correct path
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={handleProfilePress} style={styles.profileContainer}>
              <Image
                source={{ uri: otherUser.profile_picture_url }}
                style={styles.profileImage}
              />
              <Text style={styles.headerText}>{otherUser.display_name}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          inverted
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#4a90e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  messageContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#4a90e2',
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1e1e1',
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
  },
});

export default ChatScreen;
