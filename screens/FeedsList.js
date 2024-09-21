import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import supabase from '../supabaseClient';
import ProfileAlert from '../component/user/ProfileAlert';
import AddArticleButton from '../component/Feeds/AddArticleButton';
import ArticleItem from '../component/Feeds/ArticleItem';

const FeedsList = ({ navigation }) => {
  const [profile, setProfile] = useState({});
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userHeartedArticles, setUserHeartedArticles] = useState(new Set()); // Track hearted articles

  useEffect(() => {
    fetchProfile();
    fetchArticles();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        throw new Error('Unable to fetch user session');
      }

      const { data, error } = await supabase
        .from('users')
        .select('id, display_name, email, first_name, last_name, phone_number, id_number, profile_picture_url, bio')
        .eq('id', session.user.id)
        .single();

      if (error) {
        throw new Error('Error fetching profile data');
      }

      setProfile(data);
      fetchUserHeartedArticles(data.id); // Fetch user hearted articles after profile is set
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Profile Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    setLoadingArticles(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*, author:users(display_name)')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error('Error fetching articles');
      }

      setArticles(data);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Articles Fetch Error:', error);
    } finally {
      setLoadingArticles(false);
    }
  };

  const fetchUserHeartedArticles = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_likes')
        .select('article_id')
        .eq('user_id', userId);

      if (error) {
        throw new Error('Error fetching liked articles');
      }

      setUserHeartedArticles(new Set(data.map(item => item.article_id)));
    } catch (error) {
      console.error('Error fetching liked articles:', error);
    }
  };

const handleHeartArticle = async (articleId) => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    Alert.alert('Error', 'Unable to fetch user session');
    return;
  }

  const userId = session.user.id;

  try {
    // Check if the user has already liked the article
    const { data: existingLike, error: checkError } = await supabase
      .from('user_likes')
      .select('*')
      .eq('user_id', userId)
      .eq('article_id', articleId)
      .maybeSingle();

    if (checkError) {
      throw checkError;
    }

    if (existingLike) {
      // User has already liked the article
      Alert.alert('Error', 'You have already liked this article.');
      return;
    }

    // Add the like
    const { error: insertError } = await supabase
      .from('user_likes')
      .insert({ user_id: userId, article_id: articleId });

    if (insertError) {
      throw insertError;
    }

    // Increment the heart count
    const { error: updateError } = await supabase
      .from('articles')
      .update({ hearts: (await supabase.from('articles').select('hearts').eq('id', articleId).single()).data.hearts + 1 })
      .eq('id', articleId);

    if (updateError) {
      throw updateError;
    }

    // Update local state to reflect the change
    setUserHeartedArticles(prev => new Set(prev.add(articleId)));
    Alert.alert('Success', 'Article hearted!');
  } catch (error) {
    Alert.alert('Error', error.message || 'Error hearting article');
    console.error('Heart Article Error:', error);
  }
};

const handleUnheartArticle = async (articleId) => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    Alert.alert('Error', 'Unable to fetch user session');
    return;
  }

  const userId = session.user.id;

  try {
    // Check if the user has liked the article
    const { data: existingLike, error: checkError } = await supabase
      .from('user_likes')
      .select('*')
      .eq('user_id', userId)
      .eq('article_id', articleId)
      .maybeSingle();

    if (checkError) {
      throw checkError;
    }

    if (!existingLike) {
      // User has not liked the article
      Alert.alert('Error', 'You have not liked this article.');
      return;
    }

    // Remove the like
    const { error: deleteError } = await supabase
      .from('user_likes')
      .delete()
      .eq('user_id', userId)
      .eq('article_id', articleId);

    if (deleteError) {
      throw deleteError;
    }

    // Decrement the heart count
    const { error: updateError } = await supabase
      .from('articles')
      .update({ hearts: (await supabase.from('articles').select('hearts').eq('id', articleId).single()).data.hearts - 1 })
      .eq('id', articleId);

    if (updateError) {
      throw updateError;
    }

    // Update local state to reflect the change
    setUserHeartedArticles(prev => {
      const newSet = new Set(prev);
      newSet.delete(articleId);
      return newSet;
    });
    Alert.alert('Success', 'Article unhearted!');
  } catch (error) {
    Alert.alert('Error', error.message || 'Error unhearting article');
    console.error('Unheart Article Error:', error);
  }
};

  

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchArticles(); // Refresh articles
    setRefreshing(false);
  }, []);

  const calculateProfileCompletion = (profileData) => {
    const fields = [
      'display_name',
      'email',
      'first_name',
      'last_name',
      'phone_number',
      'id_number',
      'profile_picture_url',
      'bio',
    ];
    const filledFields = fields.filter(field => profileData[field]);
    return (filledFields.length / fields.length) * 100;
  };

  const profileCompletion = calculateProfileCompletion(profile);

  if (loading || loadingArticles) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text style={styles.title}>Feeds</Text>
          {profileCompletion < 100 && isAlertVisible && (
            <ProfileAlert
              completion={profileCompletion}
              onClose={() => setIsAlertVisible(false)}
            />
          )}
          <AddArticleButton />
        </View>
      )}
      data={articles}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('FeedDetails', { article: item })}>
          <ArticleItem
            article={item}
            isHearted={userHeartedArticles.has(item.id)}
            onHeart={() => handleHeartArticle(item.id)}
            onUnheart={() => handleUnheartArticle(item.id)}
          />
        </TouchableOpacity>
      )}
      ListEmptyComponent={<Text style={styles.feed}>No articles available.</Text>}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  feed: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default FeedsList;
